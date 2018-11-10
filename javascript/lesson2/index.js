'use strict';

/**
 * Alternately calls passed asynchronous functions and to calls 
 * ```reducer``` immediately after getting result before next call of 
 * the asynchronous function.
 * @param {array} asyncFunctions array of asynchronouse functons that returns Promise
 * @param {function} callback callback function passed by Array.prototype.reduce
 * @param {number} initialValue initial value for reduce function
 */
function promiseReduce(asyncFunctions, callback, initialValue) {
  if (!asyncFunctions || typeof asyncFunctions[Symbol.iterator] !== 'function') {
    throw TypeError('#promiseReduce() expects iterable of async functions as the First argument');
  }
  if (typeof callback !== 'function') {
    throw TypeError('#promiseReduce() expects function as the Second argument');
  }
  if (typeof initialValue !== 'number') {
    throw TypeError('#promiseReduce() expects Number as the Third argument');
  }

  if (Object.prototype.toString.call(asyncFunctions) !== '[Object Array]') {
    asyncFunctions = Array.from(asyncFunctions);
  }

  return new Promise(resolve => {
    let count = 0;
    let result = initialValue;
    
    caller(asyncFunctions);
    
    function caller(asyncFunctions) {
      if (count < asyncFunctions.length) {
        asyncFunctions[count]()
          .then(x => {
            result = callback(result, x);
            count++;
            caller(asyncFunctions);
          });
      } else {
        resolve(result);
      }
    }
  });
}

module.exports = {promiseReduce};

/**
 * We need: 
 * 1. вызвать функцию
 * 2. словить её возвращаемое значение
 * 3. запустить reducer
 * 4. сохранить промежуточное значение
 * 5. перейти к следующей функции
 * 6. выполнить 1 - 4.
 * если функции кончились -> вывести значение аккумулятора.
 */