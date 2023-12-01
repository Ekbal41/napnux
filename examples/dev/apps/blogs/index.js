const napnux = require("../../../../index.js");

module.exports = napnux()
  .get("/", (req, res) => {
    res.render("hello");
  });
