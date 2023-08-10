const napnux = require("napnux");

module.exports = napnux()
  // Set static serving directory for the app
  // Static path for app : /<appName>/public/style.css
  .static(__dirname + "/public")

  // Set view engine and views directory for app
  .ejs({ views: __dirname + "/views" })

  // All routes for the app goes here
  .get("/", (req, res) => {
    res.render("hello-from-app", {
      title: "Napnux | App",
      name: req.originalUrl,
    });
  });
