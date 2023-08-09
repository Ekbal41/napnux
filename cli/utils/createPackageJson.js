const { logInfo } = require("./logs");
const path = require("path");
const fs = require("fs").promises;

async function createPackageJson(targetPath, projectName) {
  const packageData = {
    name: projectName,
    version: "1.0.9",
    description: `A project created with Napnux CLI: ${projectName}`,
    main: "index.js",
    scripts: {
      start: "node index.js",
      nodemon: "nodemon index.js",
      bsync:
        "browser-sync start --proxy localhost:3000 --files 'public, views', apps/**/**",
      dev: "npm-run-all --parallel bsync nodemon",
    },
    keywords: ["napnux", "napnux cli"],
    author: "",
    license: "MIT",
    dependencies: {
      napnux: "*",
    },
    devDependencies: {
      "browser-sync": "^2.29.3",
      nodemon: "^3.0.1",
      "npm-run-all": "^4.1.5",
    },
    engines: {
      node: "14.x",
    },
  };

  const packageJsonPath = path.join(targetPath, "package.json");

  await fs.writeFile(packageJsonPath, JSON.stringify(packageData, null, 2));
  logInfo(`Created package.json: ${packageJsonPath}`);
}

module.exports = createPackageJson;
