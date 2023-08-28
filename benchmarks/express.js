const express = require("express");
const app = express();
const A = (req, res, next) => {
  //do something
  next();
};
const B = (req, res, next) => {
  //do something
  next();
};

app.use(A, B);
app.get("/", (req, res) => {
  res.end("Hello World!");
});
app.get("/hello/:name", (req, res) => {
  res.end(`Hello ${req.params.name}!`);
});
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
