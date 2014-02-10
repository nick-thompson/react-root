
var React = require('react');
var Router = require('../Router');
var ClientRoot = require('../ClientRoot');

function serverRender(path, qs, data, callback) {
  // Need to be careful about the singleton router remaining in memory
  // during the server's lifetime and attaching several listeners to the
  // same event.
  var router = new Router();
  router.removeAllListeners('route');
  router.on('route', function(desc) {
    var root = new ClientRoot({
      component: desc.component
    });
    React.renderComponentToString(root, callback);
  });
  router.navigate(path, qs);
}

function clientRender(path, qs, data, callback) {
  var router = new Router();
  router.on('route', function(desc) {
    var markup = '<script type="text/javascript" src="/static/bundles/'
      + desc.entrypoint + '.js"></script><body></body>';
    callback(markup);
  });
  router.navigate(path, qs);
}

module.exports = {
  serverRender: serverRender,
  clientRender: clientRender
};
