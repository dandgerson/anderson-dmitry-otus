'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

let requestCount = 0;
let responseCount = 0;

const server = http.createServer((request, response) => {
  console.log('request starting... ' + requestCount++);
  
  //response
  console.log('response starting... ' + responseCount++);
  response.writeHeader(200, {'Content-Type': 'text/html'});
  response.write('hello client<br>\n');
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});