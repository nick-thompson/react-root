
var React = require('react');

var Hello = React.createClass({

  render: function() {
    return React.DOM.h1(null, 'Hello, ' + this.props.name + '!');
  }

});

module.exports = Hello;
