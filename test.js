const napnux = require("./index.js");

napnux()
  .get("/", (req, res) => {
    const json = JSON.stringify({
      hay: "welcome to napnux",
      hope: "you enjoy it",
    });
    res.end(json);
  })
  .get("/hello/:name/:age?", (req, res) => {
    res.end(`Hello ${req.params.name}! You are ${req.params.age} years old.`);
  })
  .start(3000, () => {
    console.log("Listening on port 3000");
  });
