const spinners = require("cli-spinners");
const readline = require("readline");
const { red, yellow } = require("colorette");

function createSpinner() {
  const frames = spinners.dots.frames;
  let currentFrame = 0;
  let spinnerInterval;

  const spinner = {
    start: (text) => {
      process.stdout.write(frames[currentFrame] + " " + text);
      currentFrame = (currentFrame + 1) % frames.length;
      spinnerInterval = setInterval(() => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(frames[currentFrame] + " " + text);
        currentFrame = (currentFrame + 1) % frames.length;
      }, spinners.dots.interval);
      return spinnerInterval;
    },
    succeed: (text) => {
      clearInterval(spinnerInterval);
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      console.log(yellow(text));
    },
    fail: (text) => {
      clearInterval(spinnerInterval);
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      console.log(red(text));
    },
  };

  return spinner;
}

module.exports = createSpinner;
