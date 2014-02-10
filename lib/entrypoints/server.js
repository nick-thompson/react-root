/** @jsx React.DOM */

var React = require('react');
var Router = require('../Router');
var Chrome = require('../Chrome');
var ClientRoot = require('../ClientRoot');

function route(path, qs, callback) {
  var router = new Router();
  router.once('route', callback);
  router.navigate(path, qs);
}

function serverRender(path, qs, callback) {
  route(path, qs, function(desc) {
    React.renderComponentToString(
      <Chrome>
        {desc.component}
      </Chrome>,
      callback
    );
  });
}

function clientRender(path, qs, callback) {
  route(path, qs, function(desc) {
    React.renderComponentToString(
      <Chrome entrypoint={desc.entrypoint}/>,
      callback
    );
  });
}

module.exports = {
  serverRender: serverRender,
  clientRender: clientRender
};
