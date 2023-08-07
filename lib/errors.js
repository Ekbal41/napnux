module.exports = {
  defaultOnNotFound: (req, res) => {
    res.statusCode = 404;
    res.end("Not Found 🐸");
  },
  defaultOnError: (err, req, res, next) => {
    res.statusCode = 500;
    res.end("Internal Server Error ☠️");
  },
};
