import postcss from "postcss";
import Decls from "./decls";
import splitCssAttr from "./split-cssattr";

const parseCssDecls = root => {
  if (!root) return null;

  return new Promise(function (resolve, reject) {
    const decls = new Decls();

    root.walkDecls(decl => {
      const list = postcss.list.space(decl.value);

      decls.add({
        key: decl.prop,
        val: decl.value,
        data: decl,
        valueList: list
      });
    });


    setTimeout((decls) => {
      decls = splitCssAttr(decls);
      resolve(decls)
    }, 80, decls);
  });
};

export default parseCssDecls;
