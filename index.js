#!/usr/bin/env node

var http = require('http');
var mock = require('./mock');

http.createServer(function (request, response) {
  // const { headers, method, url } = request;
  const { url } = request;
  if (!url || url.indexOf('api') < -1) {
    response.end('');
    return;
  }
  
  response.setHeader("Access-Control-Allow-Origin", "*");

  const mockData = mock[url];

  if (!mockData) {
    response.writeHead(404);
    response.end(null);
    return;
  }

  const config = {
    'Content-Type': 'text/json'
  }

  if (typeof mockData === 'function') {
    new Promise(mockData)
      .then(data => {
        response.writeHead(200, config);
        response.end(JSON.stringify(data));
      })
      .catch(e => {
        response.writeHead(500);
        response.end(e);
      })
    return;
  }

  response.writeHead(200, config);
  response.end(JSON.stringify(mockData));

}).listen(8124);
