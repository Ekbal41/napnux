const napnux = require("./index.js");
const users = require("./tusers.js");

function mwares(req, res, next) {
  console.log("global  middleware running");
  next();
}
function bmwares(req, res, next) {
  console.log("base  middleware running");
  next();
}

napnux()
  .use("/users", users)
  .use(mwares)
  .use("/bmwares", bmwares)
  .get("/bmwares", (req, res) => {
    console.log("hndler  middleware running");

    res.end("I am a bmware");
  })
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
    console.log("> Server Listening on http://localhost:3000");
  });
