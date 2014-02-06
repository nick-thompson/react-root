
var vm = require('vm');
var fs = require('fs');

function bundleRequire(path, module) {
  var context = {};
  var script = fs.readFileSync(path);
  vm.runInNewContext(script, context);
  return context.require(module);
}

module.exports = bundleRequire;
