
var React = require('react');
var Router = require('./Router');
var Chrome = require('./Chrome');

// var routes = require('./routes');

var Root = React.createClass({

  getInitialState: function() {
    return {
      component: this.props.component
    };
  },

  componentWillMount: function() {
    this.router = new Router(); // pass `routes` in here
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

module.exports = Root;
