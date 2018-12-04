'use strict';

const Tree = require('./tree');

const result = new Tree('../lesson-3/test.txt')
  .getTree();

console.log(result);