const napnux = require("../../../../index.js");

let app = napnux()
  // .static(__dirname + "/extraPublic")
  // .views(__dirname + "/extraViews")
  .get("/", (req, res) => {
    res.render("hello")
  });

module.exports = app;