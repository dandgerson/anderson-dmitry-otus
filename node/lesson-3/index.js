'use strict';

const Tree = require('./tree');

const tree = new Tree();

tree.readFile('./test.txt');
console.log(tree.readFileSync('./test.txt'), '// sync');