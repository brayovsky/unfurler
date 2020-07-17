module.exports = (res, status, response) => {
  res.status(status);
  res.send(response);
}
