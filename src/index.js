
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

exports.default = function plugin() {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const modules = state.opts.modules || [];

        const modulePath = path.node.source.value;
        if (modules.some(module => test(module, modulePath))) {
          path.remove();
        }
      },
    },
  };
};
