/**
 * Clone repositories as submodules to behave properly with visual studio.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');
const package = require('../package.json');

// Get the workspace directory.
const packageFolder = package['workspaces']['packages'][0].slice(0, -1);

// Get the absolute path to this directory.
const PATH_ROOT = path.resolve('.');

// Get passed in arguments
const args = process.argv.slice(2);

function gitClone(args) {
  const repository = args[0];
  var folderName = args.length > 1 ? args[1] : false;

  if (typeof repository !== 'string') {
    console.error(
      'Please specify a repository. yarn clone <repository> [<name>]'
    );
    return;
  }

  // If the folderName is not specified, get the name from the git url.
  if (!folderName) {
    const gitRepoProjectNameRegEx = /([^/]+)\.git$/;
    folderName = gitRepoProjectNameRegEx.exec(repository)[1];
  }

  try {
    execSync(
      `git submodule add -f --name ${folderName} ${repository} ${packageFolder}/${folderName}`,
      {
        cwd: `${PATH_ROOT}`,
        stdio: ['ignore', 'ignore', 'pipe']
      }
    );
    console.log(`Cloned '${package['name']}'.`);
  } catch (error) {
    console.log(error);
  }

  execSync(`git reset HEAD ${PATH_ROOT}/${packageFolder}/${folderName}`, {
    cwd: `${PATH_ROOT}/${packageFolder}`,
    stdio: ['ignore', 'ignore', 'pipe']
  });
}

gitClone(args);

execSync(`git reset HEAD ${PATH_ROOT}/.gitmodules`);
