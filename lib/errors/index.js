const fs = require("fs");
const path = require("path");

const notFoundPage = path.join(__dirname, "not-found.html");

module.exports = {
  defaultOnNotFound: (req, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(`
    <p style="font-family: monospace;">Requested <strong>${req.method} ${req.url}</strong> not found!</p>
    `);
  },
  defaultOnError: (err, req, res, next) => {
    res.statusCode = 500;
    res.end(`<p style="font-family: monospace;">Internal server error!☠️</p>`);
  },
};
