'use strict';

const http = require('http');

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