'use strict';

const fs = require('fs');

function tree(path) {
  const result = {
    files: [],
    dirs: []
  };
  const count = {
    files: 0,
    processed: 0,
  };
  
  return new Promise((resolve, reject) => {
    
    iterateOver(path, iterator, callback);

    function iterateOver(path, iterator, callback) {
      
      
      fs.readdir(path, (err, files) => {
        count.files += files.length;
        
        for (const file of files) {
          iterator(file, report);
        }

      });
      
      function report() {
        console.log('report', result);
        count.processed++;
        if (count.processed === count.files) {
          callback();
        }
      }
    }
    
    function iterator(file, report) {
      const filePath = `${path}/${file}`;
      console.log('filePath: ', filePath);
      
      fs.stat(filePath, (err, stats) => {
        if (stats && stats.isDirectory()) {
          result.dirs.push(filePath);
          report();
          iterateOver(filePath, iterator, report);
        } else {
          stats && stats.isFile() && result.files.push(filePath);
          report();
        }
      });
    }

    function callback() {
      resolve(result);
    }

  });
}




module.exports = tree;