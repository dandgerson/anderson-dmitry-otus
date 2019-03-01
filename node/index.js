const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Function get directory path and returns file structure with JSON
 * @param {string} directoryPath - path to directoryh
 */

stringifyTree(path.resolve(__dirname));

async function stringifyTree(root) {
  // implementation
  const result = {
    files: [],
    dirs: []
  };
  
  let nodes = [];

  // call the functions
  if (await isDirectory(root)) nodes = nodes.concat(await getNodes(root));

  console.log(`Nodes: ${nodes}`);

  await collectNodes(nodes, () => {

  });

  return result;

  /**
   * 
   * @param {array} - nodes 
   */
  async function collectNodes(nodes, callback) {
    for (const node of nodes) {
      const nodePath = path.resolve(node);
      console.log(nodePath);
      if (await isDirectory(nodePath)) {
        console.log(`This is Directory: ${node}`);
        callback();
        await collectNodes(await getNodes(path.join(__dirname, node)), callback);
      }
      if (await isFile(nodePath)) {
        console.log(`This is File: ${node}`);
      }
    }
  }

  async function getNodes(nodePath) {
    return await readdir(nodePath);
  }
  
  async function isDirectory(nodePath) {
    const probeResult = await probe(nodePath);
    return probeResult === 'directory';
  }
  
  async function isFile(nodePath) {
    const probeResult = await probe(nodePath);
    return probeResult === 'file';
  }

  async function probe(nodePath) {
    const nodeStat = await stat(nodePath);
    if (nodeStat.isFile()) return 'file';
    if (nodeStat.isDirectory()) return 'directory';
    return false;
  }

}


