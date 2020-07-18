const config = require('../config');

const { apiPath } = config;

module.exports = {
  root: apiPath,
  login: `${apiPath}/login/:username/:password`,
  parseUrl: `${apiPath}/parse/:url*`,
  translate: `${apiPath}/translate/:url*`,
  upload: `${apiPath}/upload`,
  download: `${apiPath}/download/:identifier`,
};
