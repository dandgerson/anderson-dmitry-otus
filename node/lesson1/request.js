'use strict';

const http = require('http');

class Requester {
  constructor(n, requestType) {
    this.validateArgs(n, requestType);
    
    this.n = n;
    this.requestType = requestType;
  }
  
  validateArgs(n, requestType) {
    if (typeof n !== 'number')
      throw new TypeError('n must be a number');
    if (n <= 0)
      throw new ReferenceError('n must be a positive');
    if (n !== Math.ceil(this.n))
      throw new ReferenceError('n must be an integer');
    
    if (requestType !== 'serial' || requestType !== 'parallel')
      throw new ReferenceError('requestType must be "serial" or "parallel"');
  }
  
  makeRequests() {
    this.requests = new Array(this.n);
    let count = 0;

    while(count < this.n) {
      this.request.push(
        new Promise((resolve, reject) => {
          resolve(
            http.request()
          );
        })
      );

      count++;
    }
  }

  senRequests() {
    if (this.requestType === 'parallel') {
      Promise.all(this.requests);
    } else {
      
    }
  }
}

function requester(n, requestType = 'parallel') {
  if (typeof n !== 'number') 
    throw new TypeError('n must be a number');
  
  let count = n;
  const requests = new Array(n);
  
  switch (requestType) {
  case 'parallel':
    break;
  case 'serial':
    while(count) {
      http.request()
    }
    break;
  default:
    throw new ReferenceError('requestType require "serial" or "parallel" value')
  }
}