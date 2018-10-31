'use strict';

/**
 * Alternately calls passed asynchronous functions and to calls 
 * ```reduce``` immediately after getting result before next call of 
 * the asynchronous function.
 * @param {array} asyncFunctions array of asynchronouse functons that returns Promise
 * @param {function} reduce callback function like Array.prototype.reduce
 * @param {number} initialValue initial value for reduce function
 */
function promiseReduce(asyncFunctions, reduce, initialValue) {
  return new Promise((resolve, reject) => {
    
  });
}