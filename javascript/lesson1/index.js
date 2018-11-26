'use strict';

/**
 * 
 * @param {number} a
 */

function sum(a) {
  // without argument
  if (!arguments.length && a === undefined) {
    throw new TypeError('Nothing to sum. You have to pass some arguments to sum them.');
  }
  // explicit undefined as argument
  if (arguments.length && a === undefined) {
    return function() {
      return undefined;
    };
  }

  const args = [];
  
  args.push(a);
  return subSum;

  function subSum(b) {
    if (b === undefined) {
      return args.reduce((a, i) => a + i, 0);
    }
    args.push(b);
    return subSum;
  }
}

/**
 * 
 * @param {number} a
 * @param {number} b
 */
const simpleSum = (a, b) => a + b;

/**
 * 
 * @param {number} a
 */
const splitSum = a => {
  return b => {
    return a + b;
  };
};

module.exports = {sum, simpleSum, splitSum};