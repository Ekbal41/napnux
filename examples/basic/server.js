const notes = require("./apps/notes");
const blogs = require("./apps/blogs");
const root = require("./root.js");

function logger(req, res, next) {
  console.log(`${req.method} in [ ${req.url} ]`);
  next();
}
root
  // .use(logger)
  .use("/notes", notes)
  .use("/blogs", blogs)
  .static(__dirname + "/public")
  .nunjucks({
    views: __dirname + "/views",
  })
  .start(3000, () => {
    console.log("> Server Listening on http://localhost:3000");
  });
