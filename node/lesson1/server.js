'use strict';

const http = require('http');

const request = require('./request');

const hostname = '127.0.0.1';
const port = 3000;

let requestCount = 0;
let responseCount = 0;

const server = http.createServer((req, res) => {
  console.log('request starting... ' + requestCount++);
  
  //response
  return req.on('end', (error) => {
    if (error) {
      console.log('response starting... ' + responseCount++);
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write('<h1>NodeJs local server banchmark:<h1><br>\n');
      res.write(`
        <p>responses count: ${responseCount}`);
      
      setTimeout(() => {
        res.end();
      }, 100);
      throw new Error('Crash Local Server');
    }
    console.log('response starting... ' + responseCount++);
    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.write('<h1>NodeJs local server banchmark:<h1><br>\n');
    res.write(`
      <p>responses count: ${responseCount}`);
    
    setTimeout(() => {
      res.end();
    }, 100);
  });
});

new request.requester(1000, 'parallel').make().send();
// new request.requester(10, 'parallel').make();

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});