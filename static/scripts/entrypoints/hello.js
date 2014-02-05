
var React = require('react');
var Router = require('../Router');

var Root = React.createClass({

  getInitialState: function() {
    return {
      component: null
    };
  },

  componentWillMount: function() {
    this.router = new Router();
    this.router.on('route', function(desc) {
      this.setState({
        component: desc.component
      });
    }.bind(this));
  },

  render: function() {
    return this.state.component || React.DOM.h1(null, 'hi');
  }

});

var root = new Root();
window.addEventListener('load', function() {
  React.renderComponent(root, window.document.body);
  root.router.navigate(window.location.pathname, window.location.search);
});
