const napnux = require("./index.js");

module.exports = napnux().get("/", (req, res, info) => {
  let flash = req.flash("info")
  const json = JSON.stringify({
    hay: "welcome to napnux",
    hope: "This is a test for tusers.js",
    flash: flash,
  });
  res.end(json);
});
