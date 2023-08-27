const fs = require("fs");
const path = require("path");
const symlinkOrCopySync = require("symlink-or-copy").sync;

class Storage {
  constructor({ storageDir, linkOrCopyTo } = {}) {
    this.storageDir = storageDir;
    this.linkOrCopyTo = linkOrCopyTo;
    this.link();
  }
  link() {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(this.storageDir)) {
      // recursive: true creates parent directories if needed
      fs.mkdirSync(this.storageDir, { recursive: true });
    }

    if (this.linkOrCopyTo !== void 0) {
      const publicStorageDir = path.join(
        this.linkOrCopyTo,
        path.basename(this.storageDir)
      );
      // Create the symbolic link if it doesn't exist
      if (!fs.existsSync(publicStorageDir)) {
        symlinkOrCopySync(this.storageDir, publicStorageDir, { force: true });
      }
    }
  }

  store(fileData, filename) {
    const filePath = path.join(this.storageDir, filename);
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, fileData, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(filePath);
        }
      });
    });
  }

  remove(filename) {
    const filePath = path.join(this.storageDir, filename);

    return new Promise((resolve, reject) => {
      // Check if the file exists before attempting to delete
      fs.stat(filePath, (err, stats) => {
        if (err) {
          if (err.code === "ENOENT") {
            // File does not exist, resolve without error
            resolve();
          } else {
            // Other error, reject with error
            reject(err);
          }
        } else {
          // File exists, attempt to delete
          fs.unlink(filePath, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      });
    });
  }

  unLink() {
    if (this.linkOrCopyTo !== void 0) {
      const publicStorageDir = path.join(
        this.linkOrCopyTo,
        path.basename(this.storageDir)
      );

      if (fs.existsSync(publicStorageDir)) {
        fs.unlinkSync(publicStorageDir);
      }
    }
  }

  replace(file, filename) {
    return this.store(file, filename);
  }
}

module.exports = ({ storageDir, linkOrCopyTo }) =>
  new Storage({ storageDir, linkOrCopyTo });
