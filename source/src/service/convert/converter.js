import postcss from "postcss";
import parseCss from "./css/parse";
import repairCss from "./css/repair";
import parseFlutter from "./flutter/parse";

const convert2Flutter = async css => {
  const ast = await postcss([]).process(css);
  let result = await parseCss(ast.root);
  result = repairCss(result);

  const flutterStyle = parseFlutter(result);
  return flutterStyle;
};

export default convert2Flutter;
