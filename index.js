const express = require('express');
const busboy = require('connect-busboy');
const paths = require('./lib/paths');
const config = require('./config');
const authenticate = require('./lib/users/authenticate');
const parseUrl = require('./lib/urls/parse');
const translate = require('./lib/urls/translate');
const upload = require('./lib/files/upload');
const download = require('./lib/files/download');
const authorise = require('./lib/middleware/authorise');
const { client } = require('./model/client');

const app = express();

app.use(express.json());
app.use(busboy());

const db = process.env.DATABASE_NAME;

app.get(paths.root, (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Welcome to the unfurler API');
});

app.get(paths.login, (req, res) => {
  authenticate(req, res, client, db);
});

app.get(paths.parseUrl, authorise, parseUrl);

app.post(paths.translate, authorise, translate);

app.post(paths.upload, authorise, (req, res) => {
  upload(req, res, client, db);
});

app.get(paths.download, authorise, (req, res) => {
  download(req, res, client, db);
});

app.listen(config.port, () => console.log(`listening on port ${config.port}`));
