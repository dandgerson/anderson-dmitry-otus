'use strict';
const http = require('http');

const request = require('./request');

const hostname = '127.0.0.1';
const port = 3000;

const delay = 100;
let requestCount = 0;
let responseCount = 0;

const server = http.createServer((req, res) => {
  console.log('request starting... ' + requestCount++);
  req.on('error', err => {
    console.log('Server Error');
    console.error(err.stack);
  });
  
  //response
  setTimeout(() => {
    console.log('response starting... ' + responseCount++);
    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.write('<h1>NodeJs local server banchmark:<h1><br>\n');
    res.write(`
      <p>responses count: ${responseCount}`);
    
    res.end();
  }, delay);
});

new request.requester(+process.argv[2], process.argv[3]).make().send();
// new request.requester(10, 'parallel').make();

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});