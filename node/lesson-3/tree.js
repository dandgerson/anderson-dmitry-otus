'use strict';

const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

function tree(path) {
  const result = {
    files: [],
    dirs: []
  };

  let collection = new Set();
  let processed = [];

  // Where is the termination condition?
  //
  // All of the recursive function must have the termination condition?
  // where is this one in that function?

  function getFiles(path) {
    return new Promise((resolve, reject) => {
      readdir(path)
        .then(items => {
          items.forEach(item => {
            collection.add(`${path}/${item}`);
          });
          // console.log(collection);
          return collection;
        })
        .then(collection => {
          for (const item of collection) {
            stat(item)
              .then(itemStats => {
                if (!processed.includes(item)) {
                  if (itemStats.isDirectory()) {
                    processed.push(item);
                    result.dirs.push(item);
                    getFiles(item);
                  }
                  if (itemStats.isFile()) {
                    processed.push(item);
                    result.files.push(item);
                  }
                }
              })
              .catch(error => {
                throw error;
              });
          }
          return collection;
        })
        .then(collection => {
          resolve(collection);
        });
    })
      .catch(error => {
        throw error;
      });
  }

  return new Promise((resolve, reject) => {
    getFiles(path)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        throw error;
      });
  });
  
}




module.exports = tree;