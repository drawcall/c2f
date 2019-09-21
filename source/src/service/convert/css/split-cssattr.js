////////////////////////////////////////////////////////////////
//
//  Jquery is used here because it is a nice style parser.
//
////////////////////////////////////////////////////////////////

import $ from "jquery";
import { isNone } from "./utils";
import SPLIT_MAPPING from "./split-mapping";

const splitCssAttr = decls => {
  if (!decls) return null;

  let cloneDecls = decls.clone();

  for (let mainStyle in SPLIT_MAPPING) {
    cloneDecls = splitByMainStyle(
      cloneDecls,
      mainStyle,
      SPLIT_MAPPING[mainStyle]
    );
  }

  return cloneDecls;
};

const splitByMainStyle = (decls, mainStyle, subStyles = []) => {
  const val = decls.getVal(mainStyle);

  if (val) {
    $("#avator")
      .removeClass()
      .removeAttr("style")
      .css(mainStyle, val);

    subStyles.forEach(style => addValToDecls(decls, style));
    decls.remove(mainStyle);
  }

  return decls;
};

const addValToDecls = (decls, key) => {
  const val = getStyleVal(decls, key);
  if (!isNone(val)) decls.add({ key, val });
};

const getStyleVal = (decls, key) => {
  let val = $("#avator").css(key);
  if (isNone(val)) val = decls.getVal(key);

  return val;
};

export default splitCssAttr;
