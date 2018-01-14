"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plugin;

/* babel plugin is a json object, and json doesn't support regexp,
 * split to two fields: isRegExp and name
 */
function test(module, value) {
  // create a regexp if not exist
  if (module.isRegExp && !module.regExp) {
    module.regExp = new RegExp(module.name);
  }
  if (module.regExp) return module.regExp.test(value);

  return module === value;
}

function plugin() {
  return {
    visitor: {
      ImportDeclaration: function ImportDeclaration(path, state) {
        var modules = state.opts.modules || [];

        var modulePath = path.node.source.value;
        if (modules.some(function (module) {
          return test(module, modulePath);
        })) {
          path.remove();
        }
      }
    }
  };
}