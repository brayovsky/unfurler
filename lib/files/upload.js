const mongo = require('mongodb');
const Grid = require('gridfs-stream');
const respond = require('../util/sendRes');

module.exports = (req, res, dbClient, db) => {
  dbClient.connect(function (err) {
    if (err) {
      dbClient.close();
      respond(res, 500, { error: 'Internal server error' });
      return;
    }

    let receivedFile = false;
    req.busboy.on('file', function (fieldname, file, filename) {
      receivedFile = true;
      const gfs = new Grid(dbClient.db(db), mongo);

      const writeStream = gfs.createWriteStream({
        filename,
        metadata: { fieldname },
      });

      file.pipe(writeStream);

      writeStream.on('close', (file) => {
        respond(req, res, 200, file);
      });

      writeStream.on('error', (err) => {
        console.log(err);
        respond(req, res, 410, { error: 'An error occured while saving the file.' });
      });
    });

    req.busboy.on('finish', () => {
      if (!receivedFile) {
        respond(req, res, 400, { error: 'Please attach files' });
      }
    });
    req.pipe(req.busboy);
  });
};
