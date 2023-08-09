const { exec } = require("child_process");

async function installDependencies(targetPath, spinner) {
  const npmInstall = exec("npm install", { cwd: targetPath });
  spinner.start("Installing dependencies...");
  return new Promise((resolve, reject) => {
    npmInstall.on("close", (code) => {
      if (code === 0) {
        spinner.succeed("Dependencies installed successfully.");
        resolve();
      } else {
        spinner.fail("Error installing dependencies.");
        reject(new Error(`npm install exited with code ${code}`));
      }
    });
  });
}

module.exports = installDependencies;
