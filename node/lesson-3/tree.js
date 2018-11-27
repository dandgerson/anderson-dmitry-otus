'use strict';

function getTree(path) {
  const tree = {};
  tree.path = path;
  

  return JSON.stringify(tree);
}

exports.getTree = getTree;