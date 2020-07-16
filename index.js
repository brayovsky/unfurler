const express = require("express");
const paths = require('./lib/paths');
const config = require('./config');
const { client } = require('./model/client');

const app = express();
client.db(process.env.DATABASE_NAME);

app.get(paths.root, (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send("Welcome to the unfurler API");
});

app.listen(config.port, () => console.log(`listening on port ${config.port}`));
