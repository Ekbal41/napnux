const { green, red, bold, gray } = require("colorette");

function logInfo(message) {
  console.log("   " + bold(green("✔")) + " " + gray(message));
}

// function logError(message) {
//   console.error("   " + bold(red("✖")) + " " + message);
// }

module.exports = { logInfo };
