
var qs = require('qs');
var events = require('events');
var util = require('util');

function Router(routes, data) {
  this.routes = routes;
  this.data = data;
}

util.inherits(Router, events.EventEmitter);

Router.prototype.navigate = function(path, queryString) {
  var query = queryString ? qs.parse(queryString.slice(1)) : {};
  // do some routing here...
  var Hello = require('./components/Hello');
  var component = new Hello({ name: query.name || 'World' });
  this.emit('route', {
    component: component,
    entrypoint: 'hello'
  });
}

module.exports = Router;
