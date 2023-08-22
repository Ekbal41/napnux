const napnux = require("../index.js");
const bodyParser = require("body-parser");

module.exports = napnux()
  .use(
    bodyParser.json({
      type: "application/json",
    })
  )
  .get("/", (req, res) => {
    res.send(200, {
      name: "Napnux",
    });
  })
  .start(3000);
