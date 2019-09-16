import postcss from "postcss";
import parseCss from "./css/parse";
import repairCss from "./css/repair";
import parseFlutter from "./flutter/parse";

const convert2Flutter = async css => {
  try {
    const ast = await postcss([]).process(css);
    let result = await parseCss(ast.root);
    result = repairCss(result);

    const flutterStyle = parseFlutter(result);
    return flutterStyle;
  } catch (e) {
    console.log(`c2f - Error: ${e}`);
  }

  return "";
};

export default convert2Flutter;
