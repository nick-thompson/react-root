
var React = require('react');

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var serverRoot = require('./static/bundles/server');

var SHOULD_SERVER_RENDER = false;

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

// And now that the middleware has all run, we'll pass the remainder of the
// execution off onto the bundled router.
app.use(function(req, res, next) {
  var render = SHOULD_SERVER_RENDER
    ? serverRoot.serverRender
    : serverRoot.clientRender;

  render(req.path, req.queryString, function(markup) {
    res.send(200, markup);
  });
});

http.createServer(app).listen(3000, function() {
  console.log('Express server listening on port 3000.');
});
