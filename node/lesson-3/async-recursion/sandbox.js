'use strict';

const cacher = (func) => {
  const cache = {};
  return function (arg) {
    if (!cache[arg]) {
      cache[arg] = func(arg);
      return cache[arg];
    }
    return cache[arg];
  };
};

function fib(n) {
  if (n === 0) return 0;
  let a = 1,
    b = 1,
    c = false,
    index = 2;
  while (index < n) {
    c = a + b;
    a = b;
    b = c;
    index++;
  }
  return b;
}

function factorial(n) {
  return n <= 1 ? 1 : factorial(n - 1) * n;
}

const cachedFib = cacher(fib);
const cachedFactorial = cacher(factorial);

console.log(cachedFactorial(5));
console.log(cachedFactorial(5));