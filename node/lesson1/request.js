'use strict';

const http = require('http');
const promiseReduceModule = require('./promise-reduce');

class Requester {
  constructor(n, requestType) {
    this.validateArgs(n, requestType);
    
    this.n = n;
    this.requestType = requestType;
  }
  
  validateArgs(n, requestType) {
    if (typeof n !== 'number')
      throw new TypeError('n must be a number');
    if (n <= 0){
      throw new ReferenceError('n must be a positive');
    }
    if (n !== Math.floor(n)) {
      console.log(n);
      throw new ReferenceError('n must be an integer');
    }
    if (requestType !== 'serial' && requestType !== 'parallel') {
      console.log(requestType);
      throw new ReferenceError('requestType must be "serial" or "parallel"');
    }
  }
  
  makeRequests() {
    this.requests = new Array(this.n);
    let count = 0;

    while(count < this.n) {
      this.requests.push(
        new Promise((resolve, reject) => {
          resolve(
            http.request()
          );
        })
      );

      count++;
    }
    return this.requests;
  }

  senRequests() {
    if (this.requestType === 'parallel') {
      Promise.all(this.requests);
    } else {
      promiseReduceModule.promiseReduce(this.requests,
        () => {
        
        },
        0
      );
    }
  }
}

module.exports = {Requester};