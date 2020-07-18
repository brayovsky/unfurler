const mongo = require('mongodb');
const Grid = require('gridfs-stream');
const respond = require('../util/sendRes');

module.exports = (req, res, dbClient, db) => {
  dbClient.connect(function (err) {
    if (err) {
      dbClient.close();
      respond(req, res, 500, { error: 'Internal server error' });
      return;
    }

    const filename = req.params.identifier;

    const gfs = new Grid(dbClient.db(db), mongo);

    const readStream = gfs.createReadStream({ filename });

    res.set('Content-Disposition', `attachment; filename="${filename}"`);
    readStream.pipe(res);
  });
};
