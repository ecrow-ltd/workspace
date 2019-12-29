/**
 * Clone repositories as submodules to behave properly with visual studio.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const package = require('package.json');

// Get the workspace directory.
const packageFolder = package['workspaces']['packages'][0];

// Get the absolute path to this directory.
const PATH_ROOT = path.resolve('.');

// Get passed in arguments
// const args = process.argv.slice(2);

function gitClone(args) {
  const repository = args[0];
  const folderName = args.length > 1 ? args[1] : false; 

  try {
    execSync(
      `git submodule add -f --name ${package['folderName']} ${package['repository']}`,
      {
        cwd: `${PATH_ROOT}/${config['packageFolder']}`,
        stdio: 'inherit'
      }
    );
    console.log(`Cloned '${package['name']}'.`);
  } catch (error) {
    console.log(error);
  }
}

//     if (
//       !fs.existsSync(
//         `${PATH_ROOT}/${config['packageFolder']}/${package['folderName']}`
//       )
//     ) {
//       try {
//         execSync(
//           `git submodule add -f --name ${package['folderName']} ${package['repository']} ./${config['packageFolder']}/${package['folderName']}`,
//           {
//             cwd: `${PATH_ROOT}`,
//             stdio: ['ignore', 'ignore', 'pipe']
//           }
//         );
//         console.log(`Cloned '${package['name']}'.`);
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       console.log(
//         `The folder '${package['folderName']}' already exists. Skipped.`
//       );
//     }
//     // Submodules automatically stage themselves. Reset them.
//     execSync(
//       `git reset HEAD ${PATH_ROOT}/${config['packageFolder']}/${package['folderName']}`,
//       {
//         cwd: `${PATH_ROOT}`,
//         stdio: ['ignore', 'ignore', 'pipe']
//       }
//     );

execSync(`git reset HEAD ${PATH_ROOT}/.gitmodules`);
