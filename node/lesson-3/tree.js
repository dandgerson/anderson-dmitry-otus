'use strict';

const { promisify } = require('util');
const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

function tree(path) {
  const result = {
    files: [],
    dirs: []
  };

  return new Promise((resolve, reject) => {
    pathWalker(path, result)
      .then(() => resolve(result));
  });

  function pathWalker(path, result) {
    return new Promise((resolve, reject) => {
      readdir(path)
        .then(files => {
          files.forEach(file => {
            const filePath = `${path}/${file}`;
            stat(filePath)
              .then(stats => {
                stats && stats.isFile() && result.files.push(filePath);
                if (stats && stats.isDirectory()) {
                  result.dirs.push(filePath);
                  pathWalker(filePath, result);
                }
                // console.log(result);
              })
              .catch(err => console.log(err));
          });
        })
        .then(() => resolve(result))
        .catch(err => console.log(err));
    });
  }
}




module.exports = tree;