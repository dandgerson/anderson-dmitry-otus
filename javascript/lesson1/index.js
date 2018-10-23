'use strict';

function sum(a) {
  const args = [];

  if (typeof a === 'number') {
    args.push(a);
    return subSum;
  }
  
  if (typeof a === 'undefined') {
    return function() {
      return undefined;
    };
  }

  function subSum(b) {
    if (typeof b === 'number') {
      args.push(b);
      return subSum;
    }
    return args.reduce((a, i) => a + i, 0);
  }

  return args.reduce((a, i) => a + i, 0);
}

const simpleSum = (a, b) => a + b;

module.exports = {sum, simpleSum};