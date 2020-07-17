module.exports = (req, res, status, response) => {
  response.links = {
    self: req.protocol + '://' + req.get('host') + req.originalUrl,
  };
  res.status(status);
  res.send(response);
};
