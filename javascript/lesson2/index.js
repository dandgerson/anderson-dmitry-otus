'use strict';

/**
 * Alternately calls passed asynchronous functions and to calls 
 * ```reducer``` immediately after getting result before next call of 
 * the asynchronous function.
 * @param {array} asyncFunctions array of asynchronouse functons that returns Promise
 * @param {function} reducer callback function passed by Array.prototype.reduce
 * @param {number} initialValue initial value for reduce function
 */
function promiseReduce(asyncFunctions, reducer, initialValue=1) {
  if (!asyncFunctions || typeof asyncFunctions[Symbol.iterator] !== 'function') {
    throw TypeError('#promiseReduce() expects itarable of async functions as the First argument');
  }
  if (typeof reducer !== 'function') {
    throw TypeError('#promiseReduce() expects function as the Second argument');
  }
  if (typeof initialValue !== 'number') {
    throw TypeError('#promiseReduce() expects Number as the Third argument');
  }

  const promises = Array.prototype.map.call(asyncFunctions, (func => func()));
  
  return Promise.all(promises).then(results=>{
    return Array.prototype.reduce.call(results, reducer, initialValue);
  });
}

module.exports = {promiseReduce};