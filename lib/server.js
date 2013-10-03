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
});

app.get('*', function(req, res) {
  res.writeHead(404);
});

app.listen(port, function() {
  logger.info("listen %s", port);
});
