
var React = require('react');
var ClientRoot = require('../ClientRoot');

window.addEventListener('load', function() {
  var root = new ClientRoot();
  React.renderComponent(root, window.document.body);
  root.router.navigate(window.location.pathname, window.location.search);
});
