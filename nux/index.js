#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs").promises;
const path = require("path");
const { red, magenta, green, blue, bold } = require("colorette");
const createSpinner = require("./tools/createSpinner");
const copyFolderRecursive = require("./tools/copyFolderRecursive");
const createPackageJson = require("./tools/createPackageJson");
const installDependencies = require("./tools/installDependencies");

const spinner = createSpinner();

program
  .name("Nux - Cli tool for napnux framework")
  .version("1.0.6")
  .command("create-project <projectName>")
  .action(async (projectName) => {
    const isCurrentDir = projectName === "." || projectName === "./";
    const sourcePath = path.join(__dirname, "templates", "project-temp");
    const targetPath = path.join(process.cwd(), projectName);

    console.log(
      magenta(`
    ${green("Nux v1.0.5")}
    ${blue("Creating project:")} ${bold(projectName.toUpperCase())}
    `)
    );

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
