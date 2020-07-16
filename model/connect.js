const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = process.env.MONGODB_URL;

// Create a new MongoClient
const client = new MongoClient(url);

module.exports = {
  client
};
