'use strict';

const fs = require('fs');
const path = require('path');

class Tree {
  constructor(path) {
    this.validate(path);

    this.path = path;
  }
  validate(path) {
    if (typeof path !== 'string') {
      throw new Error('path must have a string type value');
    }
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


exports.tree = Tree;