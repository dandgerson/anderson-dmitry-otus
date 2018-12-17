'use strict';

const tree = require('./tree');

tree('./node')
  .then(result => console.log(result));

