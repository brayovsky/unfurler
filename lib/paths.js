const config = require('../config')

const { apiPath } = config;

module.exports = {
  root: apiPath,
  login: `${apiPath}/login/:username/:password`,
};
