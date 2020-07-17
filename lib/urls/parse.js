const htmlParser = require('htmlparser2');
const respond = require('../util/sendRes');
const { fetchHtml } = require('../util/url/fetch');
const { testContentType } = require('../util/url/contentType');

module.exports = async (req, res) => {
  const url = req.params.url + req.params[0];

  let page;
  try {
    const PageUrl = new URL(url);

    page = await fetchHtml(PageUrl.toString());

    const contentType = page.headers.get('Content-Type');

    if (!testContentType(/text\/html|application\/xhtml+xml/, contentType)) {
      throw new Error('Unsupported content type');
    }
  } catch (e) {
    respond(req, res, 412, { error: e.message });
    return;
  }

  const text = await page.text();
  const parsedHtml = parseHtml(text);
  respond(req, res, 200, parsedHtml);
};

const parseHtml = (htmlContent) => {
  let title = { og: '', dom: '' },
    favicon = '',
    largeImage = { og: [], dom: [] },
    snippet = { og: '', dom: '' },
    inTitle = false;

  const parser = new htmlParser.Parser(
    {
      onopentag: (tag, attributes) => {
        if (tag === 'meta') {
          if (attributes.property === 'og:title') title.og = attributes.content;

          if (attributes.property === 'og:image') largeImage.og.push(attributes.content);

          if (attributes.property === 'og:description') snippet.og = attributes.content;

          if (attributes.name === 'description') snippet.dom = attributes.content;
        }

        if (tag === 'title') inTitle = true;

        if (tag === 'link' && /icon/.test(attributes.rel)) favicon = attributes.href;

        if (tag === 'img') largeImage.dom.push(attributes.src);
      },

      ontext: (text) => {
        if (inTitle) title.dom = text;
      },

      onclosetag: (tag) => {
        if (tag === 'title') inTitle = false;
      },
    },
    { decodeEntities: true }
  );

  parser.write(htmlContent);

  return {
    title: title.og || title.dom,
    favicon,
    'large-image': largeImage.og[0] || largeImage.dom[0],
    snippet: snippet.og || snippet.dom,
  };
};
