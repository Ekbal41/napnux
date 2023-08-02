const napnux = require("./index.js");

module.exports = napnux()
.get("/", (req, res) => {
  const json = JSON.stringify({
    hay: "welcome to napnux",
    hope: "This is a test for tusers.js",
  });
  res.end(json);
});
