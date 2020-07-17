const { fetch } = require('cross-fetch');
const respond = require('../util/sendRes');

module.exports = async (req, res) => {
  const url = req.params.url + req.params[0];

  let page;
  try {
    const PageUrl = new URL(url);

    page = await fetch(`${PageUrl.toString()}`, {
      headers: {
        Accept: 'text/html, application/xhtml+xml',
      },
    });

    const contentType = page.headers.get('Content-Type');

    if (!testContentType(/text\/html|application\/xhtml+xml/, contentType)) {
      throw new Error('Unsupported content type');
    }
  } catch (e) {
    respond(req, res, 412, { error: e.message });
    return;
  }

  
};

const testContentType = (acceptableContent, retreivedConent) => {
  if (acceptableContent instanceof RegExp) {
    return acceptableContent.test(retreivedConent);
  } else {
    return acceptableContent === retreivedConent;
  }
};
