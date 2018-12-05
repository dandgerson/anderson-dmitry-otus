'use strict';

const Tree = require('./tree');

const tree = new Tree();

// tree.readFile('./test.txt');
// console.log(tree.readFileSync('./test.txt'), '// sync');

const fileTree = tree.getTree(process.argv[2]);
fileTree.then(tree => console.log(tree));