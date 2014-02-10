/** @jsx React.DOM */

var React = require('react');

var Hello = React.createClass({

  render: function() {
    var msg = 'Hello, ' + this.props.name + '!';
    return (
      <h1>{msg}</h1>
    );
  }

});

module.exports = Hello;
