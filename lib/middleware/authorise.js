const jwt = require('jsonwebtoken');
const config = require('../../config');
const respond = require('../util/sendRes');

module.exports = (req, res, next) => {
  const auth = req.headers['authorization'];

  if (!auth) {
    respond(req, res, 403, { error: 'Request needs authorisation header.' });
    return;
  }

  const [, token] = auth.split(' ');

  if (!token) {
    respond(req, res, 403, { error: 'Invalid authorisation header.' });
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, config.secret);
  } catch (e) {
    respond(req, res, 403, { error: 'Invalid token. Please log in again.' });
    return;
  }

  if (payload.hasOwnProperty('username')) next();
  else respond(req, res, 403, { error: 'Invalid token. Please log in again.' });
};
