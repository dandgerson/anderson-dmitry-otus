'use strict';

const lesson1 = require('./javascript/lesson1');

console.log(`sum() // ${lesson1.sum()}`);
console.log(`sum()() // ${lesson1.sum()()}`);
console.log(`simpleSum(5, 5) // ${lesson1.simpleSum(5, 5)}`);
console.log(`splitSum(5)(5) // ${lesson1.splitSum(5)(5)}`);
console.log(`sum(undefined)() // ${lesson1.sum(undefined)()}`);
console.log(`sum(1)(2)(3)() // ${lesson1.sum(1)(2)(3)()}`);