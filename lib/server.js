var pkg = require('../package.json');
var express = require('express');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({name: pkg.name});
var nconf = require('nconf');
nconf.argv();
var port = nconf.get('port') || 9080;
var app = express();

var packet = {greeting: 'hello', number: 10};

app.configure(function() {
  app.use(express.static(__dirname + '/../'));
  app.use(express.json());
});

app.use(function(req, res, next) {
  //console.log("add cors headers: " + req.url);
  //var allowHeaders = [
    //'Accept',
    //'Accept-Version',
    //'Content-Type',
    //'Api-Version'];
  var requested = req.header('access-control-request-headers') || [];
  if(typeof(requested) == 'string') {
    requested = requested.split(/, ?/);
  }
  var expose = ['Date', 'Content-type', 'Content-Length', 'ETag'];
  var methods = ["OPTIONS", "GET", "POST", "PUT", "HEAD"]
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Headers', requested.join(', '));
  res.set('Access-Control-Expose-Headers', expose.join(', '))
  res.set('Access-Control-Allow-Methods', methods.join(', '));
  res.set('Access-Control-Max-Age', 300);
  next();
});

app.get('/static', function(req, res, next) {
  res.json(packet);
});

app.post('/echo', function(req, res, next) {
  console.log("got request body: " + req.body);
  if(req.body) {
    var body = JSON.stringify(req.body);
    var len = Buffer.byteLength(body);
    res.writeHead(200, {'content-type': 'text/plain', 'content-length': len})
    //return res.json(req.body);
    return res.end(body);
  }
  next();
});

app.get('*', function(req, res) {
  res.writeHead(404);
  res.end();
});

app.listen(port, function() {
  logger.info("listen %s", port);
});
