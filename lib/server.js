var pkg = require('../package.json');
var express = require('express');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({name: pkg.name});
var nconf = require('nconf');
nconf.argv();
var port = nconf.get('port') || 9080;
var app = express();

app.configure(function() {
  app.use(express.static(__dirname + '/../'));
  app.use(express.json());
});

app.post('/echo', function(req, res, next) {
  //console.log(req.headers);
  //console.log('got echo request: ' + req.body);
  if(req.body) {
    var body = JSON.stringify(req.body);
    var len = Buffer.byteLength(body);
    res.writeHead(200, {
      'content-type': 'application/json',
      'content-length': len
    })
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
