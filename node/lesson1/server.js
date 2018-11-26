'use strict';

const http = require('http');

const requestModule = require('./request');

const hostname = '127.0.0.1';
const port = 3000;

let requestCount = 0;
let responseCount = 0;

const server = http.createServer((request, response) => {
  if (request) {
    console.log('request starting... ' + requestCount++);
  }
  
  //response
  console.log('response starting... ' + responseCount++);
  response.writeHeader(200, {'Content-Type': 'text/html'});
  response.write('hello client<br>\n');
  
  setTimeout(() => {
    response.end();
  }, 100);
});

const requester = new requestModule.Requester(10, 'parallel');
const requests = requester.makeRequests();

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});