/**
 * This script will perform git commands in all the packages.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const package = require('../package.json');

// Get the workspace directory.
const packageFolder = package['workspaces']['packages'][0].slice(0, -1);

// Get passed in arguments
const args = process.argv.slice(2);

// Get the absolute path to this directory.
const PATH_ROOT = path.resolve('.');

const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

const folders = getDirectories(`${PATH_ROOT}/${packageFolder}`);

for (var i = 0; i < folders.length; i++) {
  const folder = folders[i];
  const command = `git ${args.join(' ')}`;
  const path = folder.split('/');
  const packageName = path[path.length - 1];
  console.log('\n=========================');
  console.log(`${packageName}$`, command);
  console.log('----------');
  try {
    execSync(command, { cwd: `${folder}`, stdio: 'inherit' });
  } catch (e) {
    console.log(
      'There was a problem running this command within this directory.'
    );
  }
}
