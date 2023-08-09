const napnux = require("napnux");
module.exports = napnux()
  .get("/", (req, res) => {
    res.render("hello-from-project", {
      title: "Napnux | Project",
      name: "Napnux js!",
    });
  })
  .get("/hello/:name", (req, res) => {
    res.end(`Hello ${req.params.name}!`);
  });
