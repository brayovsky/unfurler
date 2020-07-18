const { fetch } = require('cross-fetch');
const { testContentType } = require('./contentType');

const fetchHtml = async (url, options = {}) => {
  let page;
  const PageUrl = new URL(url);

  options = Object.assign({}, options, {
    Accept: 'text/html, application/xhtml+xml',
  });

  page = await fetch(PageUrl.toString(), options);

  const contentType = page.headers.get('Content-Type');

  if (!testContentType(/text\/html|application\/xhtml+xml/, contentType)) {
    throw new Error('Unsupported content type');
  }

  return page.text();
};

module.exports = {
  fetchHtml,
};
