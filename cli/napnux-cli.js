#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs").promises;
const path = require("path");
const { red, magenta } = require("colorette");
const createSpinner = require("./utils/createSpinner");
const copyFolderRecursive = require("./utils/copyFolderRecursive");
const createPackageJson = require("./utils/createPackageJson");
const installDependencies = require("./utils/installDependencies");

const spinner = createSpinner();

program
  .name("napnux-cli")
  .version("1.0.6")
  .command("create-project <projectName>")
  .action(async (projectName) => {
    const isCurrentDir = projectName === "." || projectName === "./";
    const sourcePath = path.join(__dirname, "templates", "project-temp");
    const targetPath = path.join(process.cwd(), projectName);

    console.log(magenta(`Creating project: ${projectName}`));

    try {
      if (!isCurrentDir) {
        await fs.mkdir(targetPath);
      }
      await copyFolderRecursive(sourcePath, targetPath);
      await createPackageJson(targetPath, projectName);
      await installDependencies(targetPath, spinner);
    } catch (error) {
      spinner.fail(red("Error creating project:"));
      console.error(error);
    }
  });
program.command("create-app <appName>").action(async (appName) => {
  const sourcePath = path.join(__dirname, "templates", "app-temp");
  const targetPath = path.join(process.cwd(), "apps", appName);

  try {
    await fs.mkdir(targetPath);
    await copyFolderRecursive(sourcePath, targetPath);
    spinner.succeed(`App '${appName}' created successfully.`);
  } catch (error) {
    spinner.fail(red("Error creating app:"));
    console.error(error);
  }
});

program.parse(process.argv);
