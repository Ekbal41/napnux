const server = require("./ends.js");
server
  // Register all your apps here
  // Note: You can't resgister apps with same base path
  // Note: You can't resigter an app in the root path '.use("/", yourapp)' will not work
  .use("/todo", todo)

  // Set static serving directory for the project
  // This directory can be also used by apps, Ex : /public/style.css
  .static(__dirname + "/public")

  // Set view engine and views directory for the projectff
  // This directory can be also used by apps , but it's not recommended
  // Make sure to use different views directory for each app
  .ejs({ views: __dirname + "/views" })

  // This starts the server
  .start(3000, () => {
    console.log("> Server Listening on http://localhost:3000");
  });
