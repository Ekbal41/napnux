const path = require("path");
const fs = require("fs").promises;
const { logInfo } = require("./logs");

async function copyFolderRecursive(source, target) {
  try {
    const files = await fs.readdir(source);

    for (const file of files) {
      const sourceFilePath = path.join(source, file);
      const targetFilePath = path.join(target, file);

      const stats = await fs.stat(sourceFilePath);

      if (stats.isDirectory()) {
        await fs.mkdir(targetFilePath);
        logInfo(`Created folder: ${targetFilePath}`);
        await copyFolderRecursive(sourceFilePath, targetFilePath);
      } else {
        await fs.copyFile(sourceFilePath, targetFilePath);
        logInfo(`Copied file: ${targetFilePath}`);
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = copyFolderRecursive;
