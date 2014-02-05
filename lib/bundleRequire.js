
var vm = require('vm');
var fs = require('fs');

function bundleRequire(path, callback) {
  var context = {};
  var script = fs.readFile(path, function(err, body) {
    vm.runInNewContext(body, context);
    callback(context.require);
  });
}

module.exports = bundleRequire;
