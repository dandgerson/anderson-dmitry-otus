'use strict';

const http = require('http');

class Requester {
  constructor(n, requestType) {
    this.validate(n, requestType);
    
    this.n = n;
    this.requestType = requestType;
  }
  
  validate(n, requestType) {
    if (typeof n !== 'number')
      throw new TypeError('n must be a number');
    if (n <= 0) {
      throw new ReferenceError('n must be a positive');
    }
    if (!Number.isInteger(n)) {
      console.log(n);
      throw new ReferenceError('n must be an integer');
    }
    if (requestType !== 'serial' && requestType !== 'parallel') {
      console.log(requestType);
      throw new ReferenceError('requestType must be "serial" or "parallel"');
    }
  }
  
  make() {
    this.asyncRequestFunctions = new Array(this.n);
    let index = 0;

    while(index < this.n) {

      this.asyncRequestFunctions[index] = () => {
        return new Promise((resolve, reject) => {
          resolve(http.get('http://127.0.0.1:3000/'));
        });
      };

      index++;
    }
    return this;
  }

  send() {
    if (this.requestType === 'parallel') {
      /**
       * вот тут меня смущает, что несмотря на то, что вроде бы массив и
       * вроде бы промисов, и вроде бы он передаётся в нужный метод, Но в 
       * процессе map всё равно ведь происходит последовательный, вызов
       * каждой функции с созданием запроса
       */
      Promise.all(this.asyncRequestFunctions.map(requestFunction => requestFunction()));
      return;
    } 
    if (this.requestType === 'serial') {
      let madeRequests = 0;
      for (const requestFunction of this.asyncRequestFunctions) {
        requestFunction().then(() => {
          console.log(++madeRequests + ' request is made');
        });
      }
      return;
    }
    console.error(`
      this code have not to being executed, 
      but if you see this message, something goes wrong`);
  }
}

exports.requester = Requester;