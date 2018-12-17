'use strict';

const fs = require('fs');

const tree =  (path) => {
  const result = {
    files: [],
    dirs: []
  };

  const count = {
    items: 0,
    current: 0,
  };

  
  return new Promise((resolve, reject) => {
    
    pathCrawler(path, result, resolver);
    
    function resolver(count) {
      if (count.current === count.items) {
        resolve(result);
      }
    }

    function pathCrawler(path, tree, callback) {
      
      fs.readdir(path, (err, items) => {
        count.items += items.length;
        for (const item of items) {
          
          const itemPath = `${path}/${item}`;
          
          fs.stat(itemPath, (err, stats) => {
            count.current++;
            console.log(count);
            stats.isFile() && insertFile(itemPath, tree);
            if (stats.isDirectory()) {
              insertDirectory(itemPath, tree);
              pathCrawler(itemPath, tree, resolver);
            } 
            callback(count);
          });
        }
      });
    }

    function insertFile(filePath, tree) {
      tree.files.push(filePath);
    }
    function insertDirectory(dirPath, tree) {
      tree.dirs.push(dirPath);
    }
  });

};




module.exports = tree;