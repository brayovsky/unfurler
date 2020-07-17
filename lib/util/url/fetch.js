const { fetch } = require('cross-fetch');

const fetchHtml = (url, options = {}) => {
  options = Object.assign({}, options, {
    Accept: 'text/html, application/xhtml+xml',
  });

  return fetch(url, options);
};

module.exports = {
  fetchHtml,
};
