const env = process.env.NODE_ENV || 'development';
const secret = process.env.APP_SECRET;

const apiPath = '/api/v1';
const config = {
  development: {
    port: process.env.APP_PORT || 8000,
    apiPath,
    secret,
  },
  test: {
    apiPath,
    secret,
  },
  production: {
    port: process.env.PORT || 1337,
    apiPath,
    secret,
  },
};

module.exports = config[env];
