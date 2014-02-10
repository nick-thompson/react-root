
var qs = require('qs');
var events = require('events');
var util = require('util');

function Router(routes, data) {
  // Return a singleton so that configuration can be specified in one place,
  // and can be ignored elsewhere. Will keep client code cleaner for calls
  // to navigate() and such.
  if (arguments.callee._singletonInstance) {
    return arguments.callee._singletonInstance;
  }
  this.routes = routes;
  this.data = data;
  arguments.callee._singletonInstance = this;
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
