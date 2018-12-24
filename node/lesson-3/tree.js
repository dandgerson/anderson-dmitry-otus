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

  function getFiles(path) {
    return new Promise((resolve, reject) => {
      readdir(path)
        .then(items => {
          items.forEach(item => {
            collection.add(`${path}/${item}`);
          });
          console.log(collection);
          return collection;
        })
        .then(collection => {
          for (const item of collection) {
            stat(item)
              .then(itemStats => {
                if (itemStats.isDirectory()) {
                  getFiles(item);
                }
              })
              .catch(error => {
                throw error;
              });
          }
        });
    })
      .catch(error => {
        throw error;
      });
  }

  return new Promise((resolve, reject) => {
    getFiles(path)
      .then(collection => {
        resolve(collection);
      })
      .catch(error => {
        throw error;
      });
  });
  
}




module.exports = tree;