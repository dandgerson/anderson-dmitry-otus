'use strict';

const lesson2 = require('./javascript/lesson2');

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

const reduce = Array.prototype.reduce;

lesson2.promiseReduce(asyncFunctions, reduce, 1)
  .then(console.log);
