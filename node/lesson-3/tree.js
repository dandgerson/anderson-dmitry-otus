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

    /**
     * как мне затриггерить pathCrawler, чтобы вернуть результат?
     */

    return new Promise((resolve, reject) => {
      pathCrawler(path, tree);
      resolve(tree);
    });
    
    function pathCrawler(path, tree) {
      
      fs.readdir(path, (err, items) =>{
        for (const item of items) {
          const itemPath = `${path}/${item}`;
          
          fs.stat(itemPath, (err, stats) => {
            stats.isFile() && insertFile(itemPath, tree);
            if (stats.isDirectory()) {
              insertDirectory(itemPath, tree);
              pathCrawler(itemPath, tree);
            }
          });
        }
      });
    }

    function insertFile(filePath, tree) {
      tree.files.push(filePath);
      // console.log(tree);
    }
    function insertDirectory(dirPath, tree) {
      tree.dirs.push(dirPath);
      // console.log(tree);
    }
  }

}


module.exports = Tree;