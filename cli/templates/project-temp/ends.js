const napnux = require("napnux");
module.exports = napnux()
  // All routes for the project root goes here
  .get("/", (req, res) => {
    res.render("welcome", {
      title: "Napnux | Project 🎉",
      name: "Napnux js!",
    });
  })
  .get("/hello/:name", (req, res) => {
    res.end(`Hello ${req.params.name}!`);
  });
