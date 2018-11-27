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
    this.requests = new Array(this.n);
    let index = 0;

    while(index < this.n) {
      // error
      this.requests[index] = new Promise((resolve, reject) => {
        resolve(http.get('http://127.0.0.1:3000/'));
      });

      index++;
    }
    return this;
  }

  send() {
    if (this.requestType === 'parallel') {
      Promise.all(this.requests);
    } else {
      let maked = 0;
      for (const request of this.requests) {
        request.then(result => console.log(++maked + ' request is maked'));
      }
    }
  }
}

exports.requester = Requester;