// src/storage.js
const fs = require("fs");
const path = require("path");

class Storage {
  constructor(uploadsDir) {
    this.uploadsDir = uploadsDir;
  }

  store(fileData, filename) {
    const filePath = path.join(this.uploadsDir, filename);
    // Create the directory if it doesn't exist
    if (!fs.existsSync(this.uploadsDir)) {
      // recursive: true creates parent directories if needed
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }

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

  get(filename) {
    const filePath = path.join(this.uploadsDir, filename);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  remove(filename) {
    const filePath = path.join(this.uploadsDir, filename);
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  replace(file, filename) {
    return this.store(file, filename);
  }
}

module.exports = (uploadsDir) => new Storage(uploadsDir);
