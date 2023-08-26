const napnux = require("../../index.js");
const storage = require("./storage.js")("uploads");

module.exports = napnux()
  .get("/", (req, res) => {
    res.render("hello");
  })
  .post("/", async (req, res) => {
    console.log("req.body", req.body);
    // await storage.store(req.body.userImg, "userImg2.png");
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
