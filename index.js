#!/usr/bin/env node

var http = require('http');
var mockData = require('./mock');

http.createServer(function (request, response) {
  // const { headers, method, url } = request;
  const { url } = request;
  if (!url || url.indexOf('api') < -1) {
    response.end('');
    return;
  }
  
  response.setHeader("Access-Control-Allow-Origin", "*");

  if (mockData[url]) {
    const mock = mockData[url];
    if (typeof mock === 'function') {
      new Promise(mock)
      .then(data => {
        response.writeHead(200, { 'Content-Type': 'text/json' });
        response.end(JSON.stringify(data));
      })
      .catch(e => {
        response.writeHead(500);
        response.end(e);
      })
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/json' });
    response.end(JSON.stringify(mock));
  } else {
    response.writeHead(404);
    response.end(null);
  }
}).listen(8124);
