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
    fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  }

  readFileSync(path) {
    const data = fs.readFileSync(path, {encoding: 'utf8'});
    return data;
  }
  
  getTree() {
    const tree = {
      files: [],
      dirs: []
    };
    tree.path = this.path;

    fs.readFile(this.path, {encoding: 'utf8'}, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  
  }

}


module.exports = Tree;