import postcss from "postcss";
import { promisify } from "es6-promisify";

export default {
  async process(css) {
    const result = await postcss([]).process(css);

    const root = result.root;
    if (!root) return;
    console.log(result, root);

    return new Promise(function(resolve, reject) {
      root.walkRules(rule => {
        console.log(rule.selector);

        rule.walkDecls(decl => {
          console.log(decl.prop + " = " + decl.value);
        });

        // resolve(value);
      });
    });
  }
};
