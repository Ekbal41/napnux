const napnux = require("../../index.js");

module.exports = napnux()
  .get("/", (req, res) => {
    res.render("hello");
  })
  .post("/", (req, res) => {
    console.log("req.body", req.body);
    res.redirect("/");
  })

  .get("/send", (req, res) => {
    res.send("Hello World!");
  })
  .get("/hello/:name", (req, res) => {
    console.log(req.search);
    console.log(req.query);
    res.end(`Hello ${req.params.name}!`);
  });
