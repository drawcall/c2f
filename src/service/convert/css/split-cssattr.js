////////////////////////////////////////////////////////////////
//
//  Jquery is used here because it is a nice style parser.
//
////////////////////////////////////////////////////////////////

import { isNone } from "../../utils/num";
import SPLIT_MAPPING from "./split-mapping";
import { getAvatarStyle, setAvatarStyle } from "./avatar";

const splitCssAttr = decls => {
  if (!decls) return null;

  let cloneDecls = decls.clone();
  for (let mainStyle in SPLIT_MAPPING) {
    cloneDecls = splitByMainStyle(cloneDecls, mainStyle, SPLIT_MAPPING[mainStyle]);
  }

  return cloneDecls;
};

const splitByMainStyle = (decls, mainStyle, subStyles = []) => {
  const val = decls.getVal(mainStyle);
  if (val) {
    const allStyle = getAllStyle(decls);
    setAvatarStyle(allStyle);
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
  let val = getAvatarStyle(key);
  if (isNone(val)) val = decls.getVal(key);
  return val;
};

const getAllStyle = decls => {
  const style = {};
  decls.forEach(decl => {
    const key = decl["key"];
    const val = decl["val"];
    style[key] = val;
  });
  return style;
};

export default splitCssAttr;
