'use strict';

// const lesson1 = require('./javascript/lesson1');
const lesson2 = require('./javascript/lesson2');

// console.log(`sum() // ${lesson1.sum()}`);
// console.log(`sum()() // ${lesson1.sum()()}`);
// console.log(`simpleSum(5, 5) // ${lesson1.simpleSum(5, 5)}`);
// console.log(`splitSum(5)(5) // ${lesson1.splitSum(5)(5)}`);
// console.log(`sum(undefined)() // ${lesson1.sum(undefined)()}`);
// console.log(`sum(1)(2)(3)() // ${lesson1.sum(1)(2)(3)()}`);

const asyncFunctions = [
  function() {
    console.log('fn1');
    return Promise.resolve(1);
  },
  function() {
    return new Promise(resolve => {
      console.log('fn2');
      setTimeout(() => resolve(2), 1000);
    });
  },
];

lesson2.promiseReduce(asyncFunctions)
  .then(console.log)
  .catch(console.log);
