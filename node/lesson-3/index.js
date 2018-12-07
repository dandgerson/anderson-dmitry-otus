'use strict';

const Tree = require('./tree');

const tree = new Tree();

// tree.readFile('./test.txt');
// console.log(tree.readFileSync('./test.txt'), '// sync');

const fileTree = tree.getTree('../../node');
fileTree.then(tree => console.log(tree));