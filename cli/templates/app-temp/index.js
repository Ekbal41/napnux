const napnux = require("napnux");

module.exports = napnux()
  .static(__dirname + "/public")
  .ejs({
    views: __dirname + "/views",
  })
  .get("/", (req, res) => {
    res.render("hello-from-app", {
      title: "Napnux | App",
      name: req.originalUrl,
    });
  });
