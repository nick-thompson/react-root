/** @jsx React.DOM */

var React = require('React');

var util = require('util');

var Chrome = React.createClass({

  renderEntryPoint: function() {
    if (!this.props.entrypoint) {
      return null;
    }
    var source = util.format('/static/bundles/%s.js', this.props.entrypoint);
    return (
      <script type="text/javascript" src={source}/>
    );
  },

  render: function() {
    return (
      <html>
        <head>
          <title>React Render Example</title>
          {this.renderEntryPoint()}
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }

});

module.exports = Chrome;
