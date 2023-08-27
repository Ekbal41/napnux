module.exports = {
  /**
   * Send error as response to the client if route is not found.
   */
  defaultOnNotFound: (req, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(`
    <p style="font-family: monospace;">Requested <strong>${req.method} ${req.url}</strong> not found!</p>
    `);
  },

  /**
   * Default error handler for internal server errors.
   */
  defaultOnError: (err, req, res, next) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end(
        `<p style="font-family: monospace;">Internal server error!☠️</p>
        <p style="font-family: monospace;">${err}</p>
        `
      );
    }
  }
};
