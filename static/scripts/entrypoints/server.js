
var React = require('react');
var Router = require('../Router');
var Root = require('../components/Root');

function serverRender(path, qs, data, callback) {
  var router = new Router();
  router.on('route', function(desc) {
    var root = new Root({
      component: desc.component
    });
    React.renderComponentToString(root, callback);
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
