import toFColor from "./transform/color";
import toFunit from "./transform/unit";
import toCamel from "./transform/camel";
import toFBorder from "./transform/border";
//import intercept from "./transform/intercept";
import toFTransform from "./transform/transform";
import toFFontWeight from "./transform/fontweight";
import toDecorationImage from "./transform/background-image";
import toFBorderRadius from "./transform/border-radius";
import toFMarginPadding from "./transform/marginpadding";

const mapping = (key, val, data) => {
  let result = { key: null, val: null };
  switch (key) {
    case "background-color":
    case "color":
      result["key"] = "color";
      result["val"] = toFColor(val);
      break;

    // width & height ------------------------
    case "width":
    case "height":
      result["key"] = key;
      result["val"] = toFunit(val);
      break;

    // text decoration style ------------------------
    case "text-decoration-line":
      result["val"] = `TextDecoration.${toCamel(val)}`;
      break;

    case "text-decoration-color":
      result["val"] = toFColor(val);
      break;

    case "text-decoration-style":
      result["val"] = `TextDecorationStyle.${val}`;
      break;

    case "text-align":
      result["val"] = `TextAlign.${val}`;
      break;

    case "font-weight":
      result["val"] = toFFontWeight(val);
      break;

    case "font-size":
      result["val"] = toFunit(val);
      break;

    // padding margin ------------------------
    case "padding":
    case "margin":
      result["key"] = key;
      result["val"] = toFMarginPadding(val);
      break;

    // align items ------------------------
    case "align-items":
      result["key"] = "alignment";
      result["val"] = `Alignment.${val}`;
      break;

    // transform ------------------------
    case "transform":
      result["key"] = "transform";
      result["val"] = toFTransform(val);
      break;

    // Decoration ------------------------
    case "background-image":
      result["key"] = "image";
      result["val"] = toDecorationImage(val, data);
      break;

    case "border-radius":
      result["key"] = "borderRadius";
      result["val"] = toFBorderRadius(val);
      break;

    case "border":
      result["key"] = "border";
      result["val"] = toFBorder(val);
      break;

    default:
      result["val"] = val;
      break;
  }

  if (/^font-[a-zA-Z]+/gi.test(key) || /^text-[a-zA-Z]+/gi.test(key)) {
    result["key"] = toCamel(key);
  }

  if (/^text-decoration.*/gi.test(key)) {
    result["key"] = toCamel(key.replace(/^text-/gi, ""));
  }

  return result;
};

/////////////////////////////////////////////////////////
//
//	Filter Func
//
/////////////////////////////////////////////////////////
const isText = key => {
  if (key.indexOf("font") === 0) {
    return true;
  } else if (key.indexOf("text-") === 0) {
    return true;
  } else if (key === "color") {
    return true;
  } else {
    return false;
  }
};

const isDecoration = key => {
  if (key === "background-image" || key === "border") {
    return true;
  } else if (key.indexOf("border") >= 0) {
    return true;
  } else {
    return false;
  }
};

export { mapping, isText, isDecoration };
