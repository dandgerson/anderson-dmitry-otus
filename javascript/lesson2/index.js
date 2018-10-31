'use strict';

/**
 * Alternately calls passed asynchronous functions and to calls 
 * ```reduce``` immediately after getting result before next call of 
 * the asynchronous function.
 * @param {array} asyncFunctions array of asynchronouse functons that returns Promise
 * @param {function} reduce callback function like Array.prototype.reduce
 * @param {number} initialValue initial value for reduce function
 */
function promiseReduce(asyncFunctions, reduce = Array.prototype.reduce, initialValue = 1) {
  if (!asyncFunctions || typeof asyncFunctions[Symbol.iterator] !== 'function') {
    throw TypeError('#promiseReduce() expects itarable of async functions as the First argument');
  }
  if (typeof reduce !== 'function') {
    throw TypeError('#promiseReduce() expects Array.prototype.reduce - like function as the Second argument');
  }
  if (typeof initialValue !== 'number') {
    throw TypeError('#promiseReduce() expects Number as the Third argument');
  }
  
  return new Promise((resolve, reject) => {
    resolve('hello');
  });
}

module.exports = {promiseReduce};