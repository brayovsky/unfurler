const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URL;

const client = new MongoClient(url);

module.exports = {
  client,
};
