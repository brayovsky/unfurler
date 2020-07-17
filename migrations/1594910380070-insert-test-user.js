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
      .collection('users')
      .insertOne({
        username: 'test',
        password: '7d0811c2e6297f702a0574fcd2598480',
      })
      .then(() => {
        console.log('Inserted test');
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
      .collection('users')
      .deleteOne({
        username: 'test',
        password: '7d0811c2e6297f702a0574fcd2598480',
      })
      .then(() => {
        console.log('Removed test');
        next();
      })
      .catch((err) => {
        throw err;
      })
      .finally(client.close);
  });
};
