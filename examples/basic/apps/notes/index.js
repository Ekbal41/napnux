const napnux = require("../../../../index.js");

module.exports = napnux()
  .static(__dirname + "/public")
  .views(__dirname + "/views")

  .get("/", (req, res) => {
    res.render("hello");
  });
