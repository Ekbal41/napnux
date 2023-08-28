const { exec } = require("child_process");
const { red } = require("colorette");

async function installDependencies (targetPath, spinner) {
  const npmInstall = exec("npm install", { cwd: targetPath });
  console.log(`
  Using npm to install dependencies. This may take a few minutes.
  `);
  spinner.start("Installing dependencies...");
  return new Promise((resolve, reject) => {
    npmInstall.on("close", (code) => {
      if (code === 0) {
        spinner.succeed(
          `Success🎉
          
          `
        );
        resolve();
      } else {
        spinner.fail(`
       ${red("[Error] ")}Error installing dependencies.
       ${red(
         "[Error] "
       )}Please try again manually: cd ${targetPath} && npm install`);
        reject(new Error(`npm install exited with code ${code}`));
      }
    });
  });
}

module.exports = installDependencies;
