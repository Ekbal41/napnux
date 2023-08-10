const fs = require("fs");
const path = require("path");

const notFoundPage = path.join(__dirname, "not-found.html");

module.exports = {
  defaultOnNotFound: (req, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");

    fs.readFile(notFoundPage, "utf8", (err, template) => {
      if (err) {
        console.error("Error reading not-found.html:", err);
        res.end("404 Not Found");
      } else {
        const renderedTemplate = template.replace(
          "{{requestedRoute}}",
          req.originalUrl
        );
        res.end(renderedTemplate);
      }
    });
  },
  defaultOnError: (err, req, res, next) => {
    res.statusCode = 500;
    res.end("Internal Server Error ☠️");
  },
};
