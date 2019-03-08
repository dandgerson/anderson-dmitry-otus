'use strict';

const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

function tree(root) {
  const result = {
    files: [],
    dirs: []
  };

  const collection = new Set();
  const processed = [];

  const checkItem = async function (itemPath) {
    const stats = await stat(itemPath);
    return {
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
    };
  };

  const getPaths = async function (path) {
    const paths = await readdir(path);
    paths.forEach(item => collection.add(`${path}/${item}`));
    collection.forEach(itemPath => {
      const stats = (async function () {
        return await checkItem(itemPath);
      })();
      if (!processed.includes(itemPath)) {
        processed.push(itemPath);
        if (stats.isDirectory) {
          result.dirs.push(itemPath);
          (async function () {
            await getPaths(itemPath);
          })();
        } else if (stats.isFile) {
          result.files.push(itemPath);
        }
      }
    });
  };

  const getResult = async function (result) {
    await getPaths(root);
    return result;
  };

  return getResult(result);
}




module.exports = tree;