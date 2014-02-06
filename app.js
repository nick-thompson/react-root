
var React = require('react');

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var bundleRequire = require('./lib/bundleRequire');
var serverRoot = bundleRequire(
  './static/scripts/bundles/server.js',
  'serverRoot'
);

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.errorHandler());
app.use('/static', express.static(path.join(__dirname, 'static')));

// I'm using a little middleware here to prepare the raw queryString for
// our router. The router will have to do it's own queryString parsing because
// there's no nice middleware for that on the client. Thus, to remain truly
// idempotent, I'll have the router parse the raw queryString on the server
// as well.
app.use(function(req, res, next) {
  var i = req.originalUrl.indexOf('?');
  var queryString = (i > -1)
    ? req.originalUrl.slice(i)
    : null;

  req.queryString = queryString;
  return next();
});

app.use(function(req, res, next) {
  var data = {};
  var ua = req.get('User-Agent');
  if (/Chrome/.test(ua)) {
    // Let's client-render in chrome just for giggles
    serverRoot.clientRender(req.path, req.queryString, data, function(markup) {
      res.send(200, markup);
    });
  } else {
    // And server-render elsewhere
    serverRoot.serverRender(req.path, req.queryString, data, function(markup) {
      res.send(200, markup);
    });
  }
});

http.createServer(app).listen(3000, function() {
  console.log('Express server listening on port 3000.');
});
