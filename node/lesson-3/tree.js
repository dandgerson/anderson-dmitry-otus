'use strict';

const fs = require('fs');
const path = require('path');

class Tree {
  validate(path) {
    if (typeof path !== 'string') {
      throw new Error('path must have a string type value');
    }
  }

  readFile(path) {
    this.validate(path);
    fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  }

  readFileSync(path) {
    this.validate(path);
    const data = fs.readFileSync(path, {encoding: 'utf8'});
    return data;
  }

  getStats(path) {
    this.validate(path);
    fs.stat(path, (err, stats) => {
      return {
        path: path,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
      };
    });
  }
  
  getTree(path) {
    this.validate(path);
    const tree = {
      files: [],
      dirs: []
    };

    return new Promise((resolve, reject) => {
      crawlByPath(path);
      Promise.resolve(tree);

      function crawlByPath(path) {
        fs.readdir(path, (err, items) =>{
          for (const item of items) {
            const itemPath = `${path}/${item}`;
            fs.stat(itemPath, (err, stats) => {
              console.log(itemPath);
              if (!stats) {
                return;
              }
              stats.isFile() && tree.files.push(itemPath);
              if (stats.isDirectory()) {
                tree.dirs.push(itemPath);
                crawlByPath(itemPath);
              }
            });
          }
        });
      }

    });
  
  }

}


module.exports = Tree;