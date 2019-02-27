const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Function get directory path and returns file structure with JSON
 * @param {string} directoryPath - path to directoryh
 */

stringifyTree(path.join(__dirname));

async function stringifyTree(root) {
// implementation
  const result = {
    files: [],
    dirs: []
  };

  const tree = await getNodes(root);

  await collectNodes(
    tree, 
    async node => {
      const probeResult = await probe(node);
      probeResult === 'directory' && result.dirs.push(node);
      probeResult === 'file' && result.files.push(node);
    }
  );

  console.log(result);

  return result;
  
  async function collectNodes(nodes, visitor) {
    for (const node of nodes) {
      const probeResult = await probe(node);
      if (probeResult === 'directory') {
        for (const child of node) {
          collectNodes(await getNodes(child), visitor);
        }
      } else {
        visitor(nodes);
      }
    }
    
    // for (let node of nodes) {
    //   collection.push(node);
    //   try {
    //     const probeResult = await probe(root + '\\' + node);
    //     if (probeResult === 'directory') {
    //       nodePath = node;
    //       console.log(`nodePath: ${nodePath}`);
    //       collectNodes(await getNodes(root + '\\' + nodePath));
    //     }
    //   } catch(err) {
    //     err && console.error(err);
    //   }
    // }
  }

  async function getNodes(nodePath) {
    return await readdir(nodePath);
  }

  async function probe(path) {
    const nodeStat = await stat(path);
    if (nodeStat.isFile()) return 'file';
    if (nodeStat.isDirectory()) return 'directory';
    return false;
  }

}