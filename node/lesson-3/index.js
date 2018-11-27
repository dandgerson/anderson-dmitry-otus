'use strict';

const tree = require('./tree');

const result = new tree.tree('../lesson-3/test.txt')
  .getTree();

console.log(result);