const napnux = require("../../index.js");
module.exports = napnux()
  .get("/", (req, res) => {
    res.render("hello");
  })
  .get("/send", (req, res) => {
    res.send("Hello World!");
    // res.send({
    //   message: "Hello World!",
    // });

  })
  .get("/hello/:name", (req, res) => {
    res.end(`Hello ${req.params.name}!`);
  });
