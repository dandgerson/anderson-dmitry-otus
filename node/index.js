const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Function get directory path and returns file structure with JSON
 * @param {string} directoryPath - path to directoryh
 */

// console.log(path.join(__dirname));

stringifyTree(path.join(__dirname));

async function stringifyTree(directoryPath) {
// implementation
  const result = {
    files: [],
    dirs: []
  };

  let collection = [];

  await collectNodes(await getNodes(directoryPath));

  for (let node of collection) {
    const status = await probe(node);
    if (status === 'file') result.files.push(node);
    if (status === 'directory') result.dirs.push(node);
  }

  return result;
  
  async function collectNodes(nodes) {
    console.log(nodes);
    for (let node of nodes) {
      collection.push(node);
      const nodePath = `${directoryPath}/${node}`;
      try {
        const probeResult = await probe(nodePath);
        if (probeResult === 'directory') {
          collectNodes(await getNodes(nodePath));
        }

      } catch(err) {
        if (err) throw new Error(err);
      }
    }
  }

  async function getNodes(tree) {
    return await readdir(tree);
  }

  async function probe(path) {
    const nodeStat = await stat(path);
    if (nodeStat.isFile()) return 'file';
    if (nodeStat.isDirectory()) return 'directory';
    return false;
  }

}