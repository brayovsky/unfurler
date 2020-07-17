const md5 = require('md5');
const respond = require('../util/sendRes');
const generateToken = require('../util/generateToken');

module.exports = (req, res, dbClient, db) => {
  dbClient.connect(function (err) {
    if (err) {
      dbClient.close();
      respond(res, 500, { error: 'Internal server error' });
      return;
    }

    const { username, password } = req.params;

    dbClient
      .db(db)
      .collection('users')
      .findOne(
        {
          username,
          password: md5(password),
        },
        (err, result) => {
          if (err) {
            respond(res, 500, { error: 'Internal server error' });
            return;
          }

          if (result) {
            const token = generateToken(result);
            result.token = token;
            respond(res, 200, result);
          } else {
            respond(res, 401, {
              error: 'Wrong username, password combination',
            });
          }
        }
      );
  });
};
