
var React = require('react');

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var bundleRequire = require('./lib/bundleRequire');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.errorHandler());
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(function(req, res, next) {
  var data = {};
  var i = req.originalUrl.indexOf('?');
  var qs = (i > -1)
    ? req.originalUrl.slice(i)
    : null;

  bundleRequire('./static/scripts/bundles/server.js', function(r) {
    var serverRoot = r('serverRoot');
    var ua = req.get('User-Agent');
    if (/Chrome/.test(ua)) {
      // Let's client-render in chrome just for giggles
      serverRoot.clientRender(req.path, qs, data, function(markup) {
        res.send(200, markup);
      });
    } else {
      // And server-render elsewhere
      serverRoot.serverRender(req.path, qs, data, function(markup) {
        res.send(200, markup);
      });
    }
  });
});

http.createServer(app).listen(3000, function() {
  console.log('Express server listening on port 3000.');
});
