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

  return pathWalker(path, result);

  function pathWalker(path, result) {
    return readdir(path)
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
              console.log(result);
            });
        });
      });
  }
        
  // function pathCrawler(path, result, callback) {
    
  //   fs.readdir(path, (err, files) => {
  //     count.files += files.length;
  //     for (const file of files) {
            
  //       const filePath = `${path}/${file}`;
        
  //       fs.stat(filePath, (err, stats) => {
  //         count.processed++;
  //         console.log(count);
  //         stats.isFile() && result.files.push(filePath);
  //         if (stats.isDirectory()) {
  //           result.dirs.push(filePath);
  //           pathCrawler(filePath, result, callback);
  //         } 
  //         callback(count);
  //       });
  //     }
  //   });
  // }
  // function callback(count) {
  //   if (count.processed >= count.files) {
  //     resolve(result);
  //   }
  // }
}




module.exports = tree;