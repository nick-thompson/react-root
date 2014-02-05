
var React = require('react');
var Router = require('../Router');

var Root = React.createClass({

  getInitialState: function() {
    return {
      component: this.props.component
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

module.exports = Root;
