'use strict';

const tree = require('./node/lesson-3/tree');
// console.log(process.argv);
tree(process.argv[2])
  .then(result => console.log(result))
  .catch(err => console.log(err));