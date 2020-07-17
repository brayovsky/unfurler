'use strict';
const { client } = require('../model/client');

const dbName = process.env.DATABASE_NAME;

module.exports.up = function (next) {
  client.connect(function (err) {
    if (err) {
      client.close();
      throw err;
    }

    client
      .db(dbName)
      .createCollection('users')
      .then(() => {
        console.log('Created users collection');
        next();
      })
      .catch((err) => {
        throw err;
      })
      .finally(client.close);
  });
};

module.exports.down = function (next) {
  client.connect(function (err) {
    if (err) {
      client.close();
      throw err;
    }

    client
      .db(dbName)
      .dropCollection('users')
      .then((didDrop) => {
        if (didDrop) {
          console.log('Dropped collection users');
        } else {
          throw Error('Failed to drop collextion users');
        }
        next();
      })
      .catch((err) => {
        throw err;
      })
      .finally(client.close);
  });
};
