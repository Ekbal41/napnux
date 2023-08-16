const napnux = require("napnux");

module.exports = napnux()
  // Define the directory for serving static files within the app
  // The static path for the app will be: /<appName>/public/style.css
  .static(__dirname + "/public")

  // Configure the view engine and specify the directory for app views
  .nunjucks({ views: __dirname + "/views" })

  // Define the routes for the app below
  .get("/", (req, res) => {
    res.render("welcome", {
      title: "Napnux | App",
      name: req.originalUrl,
    });
  });
