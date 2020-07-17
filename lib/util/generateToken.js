const jwt = require("jsonwebtoken");
const config = require('../../config');

module.exports = data => {
  return jwt.sign(data, config.secret, {expiresIn: '3d'})
}