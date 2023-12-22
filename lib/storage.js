/*!
 * napnux
 * Copyright(c)  Asif Ekbal
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */
const fs = require("fs");
const path = require("path");
const symlinkOrCopySync = require("symlink-or-copy").sync;

class Storage {
  constructor ({ storageDir, linkOrCopyTo } = {}) {
    this.storageDir = storageDir;
    this.linkOrCopyTo = linkOrCopyTo;
    this.link();
  }

  link () {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(this.storageDir)) {
      // recursive: true creates parent directories if needed
      fs.mkdirSync(this.storageDir, { recursive: true });
    }

    if (this.linkOrCopyTo !== undefined) {
      const publicStorageDir = path.join(
        this.linkOrCopyTo,
        path.basename(this.storageDir)
      );

      // Create the symbolic link if it doesn't exist
      if (!fs.existsSync(publicStorageDir) && !fs.lstatSync(publicStorageDir).isSymbolicLink()) {
        symlinkOrCopySync(this.storageDir, publicStorageDir, { force: true });
      }
    }
  }

  /**
   * Store a file in the storage directory.
   * @param {Buffer|string} fileData - The file content to be stored.
   * @param {string} filename - The name of the file to be stored.
   */
  store (fileData, filename) {
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

  /**
   * Remove a file from the storage directory.
   * @param {string} filename - The name of the file to be removed.
   */
  remove (filename) {
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

  /**
   * Remove symbolic links or copies created for the storage directory, if configured.
   */
  unLink () {
    if (this.linkOrCopyTo !== undefined) {
      const publicStorageDir = path.join(
        this.linkOrCopyTo,
        path.basename(this.storageDir)
      );

      if (fs.existsSync(publicStorageDir)) {
        fs.unlinkSync(publicStorageDir);
      }
    }
  }
}

module.exports = ({ storageDir, linkOrCopyTo }) =>
  new Storage({ storageDir, linkOrCopyTo });
