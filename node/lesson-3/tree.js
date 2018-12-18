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
    
    iterator(path, report);
    
    function callback() {
      resolve(result);
    }

    function iterator(path, report) {
      
      fs.readdir(path, (err, files) => {
        count.files += files.length;
        for (const file of files) {
          
          const filePath = `${path}/${file}`;
          
          fs.stat(filePath, (err, stats) => {
            stats.isFile() && result.files.push(filePath);
            if (stats.isDirectory()) {
              result.dirs.push(filePath);
              iterator(filePath, report);
            } 
            report(count);
          });
        }
      });
    }

    function report() {
      count.processed++;
      if (count.processed === count.files) {
        callback();
      }
    }

  });
};




module.exports = tree;