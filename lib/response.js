const { green, red } = require("colorette");
module.exports = {
  send: (req, res, body) => {
    let chunk = body;

    if (body.length === 2) {
      if (typeof body[0] === "number" && typeof body[1] !== "number") {
        res.statusCode = body[0];
        chunk = body[1];
      } else {
        throw new Error(`
        Use ${green("res.send(statusCode, body)")} instead of ${red(
          "res.send(body, statusCode)"
        )}
        `);
      }

      switch (typeof chunk) {
        case "string":
          res.setHeader("Content-Type", "text/plain");
          break;
        case "object":
        case "boolean":
          if (chunk === null) {
            chunk = "";
          } else if (Buffer.isBuffer(chunk)) {
            res.setHeader("Content-Type", "application/octet-stream");
          } else {
            res.setHeader("Content-Type", "application/json");
            chunk = JSON.stringify(chunk);
          }
          break;
      }

      res.end(chunk);
    }
  },
};
