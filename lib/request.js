/*!
 * napnux
 * Copyright(c)  Asif Ekbal
 * MIT Licensed
 */
"use strict";

/**
 * Module dependencies.
 */
const busboy = require("busboy");

module.exports = {
  /**
   * Parse the request query string.
   */
  query: (req) => {
    const protocol = req.connection.encrypted ? "https" : "http";
    const purl = new URL(`${protocol}://${req.headers.host}${req.url}`);
    return Object.fromEntries(purl.searchParams.entries());
  },

  /**
   * Parse the request search string.
   */
  search: (req) => {
    const protocol = req.connection.encrypted ? "https" : "http";
    const purl = new URL(`${protocol}://${req.headers.host}${req.url}`);
    return purl.search;
  },

  /**
   * Parse the request body.
   */
  body: async (req, res, next) => {
    let fieldData = {};
    const fileData = {};

    if (req.method === "POST") {
      const bb = busboy({ headers: req.headers });

      // Promisify busboy events
      const processFileEvent = (name, file, info) => {
        return new Promise((resolve) => {
          const { filename, encoding, mimeType } = info;
          const chunks = [];
          let fileSize = 0;

          file.on("data", (data) => {
            chunks.push(data);
            fileSize += data.length; // Accumulate file size
          });

          file.on("end", () => {
            const fileBuffer = Buffer.concat(chunks);
            const sizeKB = (fileSize / 1024).toFixed(2);
            const sizeMB = (fileSize / (1024 * 1024)).toFixed(2);
            const displaySize =
              fileSize >= 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`;

            const fileObj = {
              name: filename,
              type: mimeType,
              encoding,
              size: sizeKB,
              sizeMB,
              displaySize,
              data: fileBuffer
            };
            if (!fileData[name]) {
              fileData[name] = [];
            }
            fileData[name].push(fileObj);
            resolve();
          });
        });
      };

      bb.on("file", async (name, file, info) => {
        try {
          await processFileEvent(name, file, info);
        } catch (error) {
          console.error("Error processing file:", error);
        }
      });

      bb.on("field", (name, val) => {
        fieldData = { ...fieldData, [name]: val };
      });

      // Promisify busboy finish event
      const finishEventPromise = new Promise((resolve) => {
        bb.on("finish", () => {
          resolve();
        });
      });

      req.pipe(bb);
      try {
        // Wait for the finish event and file data processing
        await Promise.all([
          finishEventPromise,
          ...Object.values(fileData).map((files) =>
            Promise.all(files.map((f) => f.data))
          )
        ]);
      } catch (error) {
        console.error("Error processing form data:", error);
      }

      // Organize file data and field data
      const newFormData = {};
      for (const key in fileData) {
        if (fileData[key].length === 1) {
          newFormData[key] = fileData[key][0];
        } else {
          newFormData[key] = fileData[key];
        }
      }

      // Assign processed data to req.body
      req.body = { ...fieldData, ...newFormData };
    }

    next();
  }
};
