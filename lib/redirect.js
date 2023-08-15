module.exports = function (req, res, url) {
  if (!url) {
    throw new TypeError("argument url is required to res.redirect");
  }
  res.statusCode = 302;
  res.writeHead(302, { Location: url });
  res.end();
};
