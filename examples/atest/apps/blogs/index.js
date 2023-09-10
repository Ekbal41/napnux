const napnux = require("../../../../index.js");

module.exports = napnux()
  // .static(__dirname + "/extraPublic")
  // .views(__dirname + "/extraViews")
  .get("/", (req, res) => {
    res.render("hello");
  });
