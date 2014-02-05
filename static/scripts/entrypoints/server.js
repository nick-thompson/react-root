
var React = require('react');
var Router = require('../Router');

function serverRender(path, qs, data, callback) {
  var router = new Router();
  router.on('route', function(desc) {
    React.renderComponentToString(desc.component, callback);
  });
  router.navigate(path, qs);
}

function clientRender(path, qs, data, callback) {
  var router = new Router();
  router.on('route', function(desc) {
    var markup = '<script type="text/javascript" src="/static/scripts/bundles/'
      + desc.entrypoint + '.js"></script><body></body>';
    callback(markup);
  });
  router.navigate(path, qs);
}

module.exports = {
  serverRender: serverRender,
  clientRender: clientRender
};
