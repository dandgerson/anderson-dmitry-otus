'use strict';

const { promisify } = require('util');
const fs = require('fs');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

function tree(path) {
  const result = {
    files: [],
    dirs: []
  };

  return new Promise((resolve, reject) => {
    pathWalker(path, result)
      .then(result => resolve(result));
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
              });
          });
        })
        .then(result => resolve(result));
    });
  }
}




module.exports = tree;