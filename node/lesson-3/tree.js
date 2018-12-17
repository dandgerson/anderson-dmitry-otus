'use strict';

const fs = require('fs');

const tree = path => {
  const result = {
    files: [],
    dirs: []
  };

  const count = {
    files: 0,
    processed: 0,
  };

  return new Promise((resolve, reject) => {
    
    pathCrawler(path, result, callback);
    
    function callback(count) {
      if (count.processed >= count.files) {
        resolve(result);
      }
    }

    function pathCrawler(path, result, callback) {
      
      fs.readdir(path, (err, files) => {
        count.files += files.length;
        for (const file of files) {
          
          const filePath = `${path}/${file}`;
          
          fs.stat(filePath, (err, stats) => {
            count.processed++;
            console.log(count);
            stats.isFile() && result.files.push(filePath);
            if (stats.isDirectory()) {
              result.dirs.push(filePath);
              pathCrawler(filePath, result, callback);
            } 
            callback(count);
          });
        }
      });
    }
  });
};




module.exports = tree;