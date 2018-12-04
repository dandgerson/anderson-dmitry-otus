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
    this.asyncRequestFunctions = [];
    
    for (let i = 0; i < this.n; i++) {
      this.asyncRequestFunctions.push(() => {
        return new Promise((resolve, reject) => {
          http.get('http://127.0.0.1:3000/', res => {
            const { statusCode } = res;
            if (statusCode !== 200) {
              const error = new Error('Request Faild.\n' +
                `Status Code: ${statusCode}`);
              reject(error);
            }
            resolve(res);
          });
        });
      }); 
    }

    return this;
  }

  send() {
    if (this.requestType === 'parallel') {
      Promise.all(this.asyncRequestFunctions.map(requestFunction => requestFunction()))
        .then(() => console.log('All of Parallel Requests is made'))
        .catch(error => console.log(error));
      return;
    }
    
    const len = this.asyncRequestFunctions.length;
    if (this.requestType === 'serial') {
      let index = 0;
      serialRequester(this.asyncRequestFunctions, index);
      return;
    }
    
    function serialRequester(asyncRequestFunctions, index) {
      if (typeof asyncRequestFunctions[index] === 'function'
        && index < len) {
        asyncRequestFunctions[index]()
          .then(() => {
            index++;
            console.log(index + ' request is made');
            serialRequester(asyncRequestFunctions, index);
          })
          .catch(err => {
            console.log(err);
          });
      }
      else {
        console.log('All of Serial Requests is made');
      }
    }
  }
}


exports.requester = Requester;