
var React = require('react');
var Root = require('../Root');
var root = new Root();

window.addEventListener('load', function() {
  React.renderComponent(root, window.document.body);
  root.router.navigate(window.location.pathname, window.location.search);
});
