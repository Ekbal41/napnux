const path = require("path");
const fs = require("fs").promises;
const { blue, green, gray } = require("colorette");

async function copyFolderRecursive (source, target) {
  const files = await fs.readdir(source);

  for (const file of files) {
    const sourceFilePath = path.join(source, file);
    const targetFilePath = path.join(target, file);

    const stats = await fs.stat(sourceFilePath);

    if (stats.isDirectory()) {
      await fs.mkdir(targetFilePath);

      console.log(
        `${blue("Info: ")}${green(path.basename(sourceFilePath))} ${gray(
          targetFilePath
        )}`
      );

      await copyFolderRecursive(sourceFilePath, targetFilePath);
    } else {
      await fs.copyFile(sourceFilePath, targetFilePath);
      console.log(
        `${blue("Info: ")}${green(path.basename(sourceFilePath))} ${gray(
          targetFilePath
        )}`
      );
    }
  }
}

module.exports = copyFolderRecursive;
