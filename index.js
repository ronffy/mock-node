#!/usr/bin/env node

var http = require('http');
var defaultMock = require('./.defaultMock');
var mock = require(__dirname + '/.mock');
const { arr2obj } = require('./_utils');

let args = process.argv.slice(2);
args = arr2obj(args);

http.createServer(function (request, response) {
  // const { headers, method, url } = request;
  const { url } = request;
  if (!url || url.indexOf('api') < -1) {
    response.end('');
    return;
  }
  
  response.setHeader("Access-Control-Allow-Origin", "*");

  const mockData = (mock || defaultMock)[url];

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

}).listen(args.port || '8818');
