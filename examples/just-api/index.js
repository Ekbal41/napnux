const napnux = require("../../index.js");

const A = (req, res, next) => {
  //do something
  next();
};
const B = (req, res, next) => {
  //do something
  next();
};

napnux()
  .use(A, B)
  .get("/", (req, res) => {
    res.end("Hello World!");
  })
  .get("/hello/:name", (req, res) => {
    res.end(`Hello ${req.params.name}!`);
  })
  .start(3000, (req, res) => {
    console.log("Server started on http://localhost:3000");
  });
