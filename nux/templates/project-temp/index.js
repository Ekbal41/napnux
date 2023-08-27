const server = require("./ends.js");
server
  // Register your apps here
  // Note: Apps with the same base path cannot be registered
  // Note: Registering an app at the root path won't work (e.g., .use("/", yourapp))
  // .use("/todo", todo)

  // Set the directory for serving static files in the project
  // Apps can also utilize this directory, e.g., /public/style.css
  .static(__dirname + "/public")

  // Configure the view engine and specify the directory for project views
  // While apps can also access this directory, it's advisable to use separate views for each app
  .views(__dirname + "/views")

  // Start the server on port 3000
  .start(3000, () => {
    console.log("> Server is now listening at http://localhost:3000");
  });
