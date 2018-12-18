'use strict';

const fs = require('fs');

function tree(path) {
  const result = {
    files: [],
    dirs: []
  };
  const count = {
    files: 0,
    nextItemIndex: 0,
  };
  
  return new Promise((resolve, reject) => {
    
    waterfallOver(path, iterator, callback);
    
    function callback() {
      resolve(result);
    }
  });

  function waterfallOver(path, iterator, callback) {

    fs.readdir(path, (err, files) => {
      count.files += files.length;
      console.log(count);

      iterator(files[0], report);

      function report() {
        console.log('report', result);
        count.nextItemIndex++;
        if (count.nextItemIndex === count.files) {
          callback();
        } else {
          iterator(files[count.nextItemIndex], report);
        }
      }
    });
  }
  
  function iterator(file, report) {
    if (!file) return report();
    const filePath = `${path}/${file}`;
    console.log('filePath: ', filePath);
    
    fs.stat(filePath, (err, stats) => {
      if (stats && stats.isDirectory()) {
        result.dirs.push(filePath);
        report();
        waterfallOver(filePath, iterator, report);
      } else {
        console.log('here');
        stats && stats.isFile() && result.files.push(filePath);
        report();
      }
    });
  }
}




module.exports = tree;