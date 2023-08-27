const path = require("path");
const napnux = require("../../index.js");

const storage = napnux.FSStorage({
  storageDir: path.join(__dirname, "givens"),
  linkOrCopyTo: path.join(__dirname, "public"),
});

module.exports = napnux()
  .get("/", (req, res) => {
    res.render("hello");
  })
  .post("/", async (req, res) => {
    await storage.store(req.body.userImg.data, req.body.userImg.name);
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
