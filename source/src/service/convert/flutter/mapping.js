import toFunit from "./transform/unit";
import toCamel from "./transform/camel";
import toFColor from "./transform/color";
import toFBorder from "./transform/border";
import toBoxShadow from "./transform/boxshadow";
import toFTransform from "./transform/transform";
import getFromData from "./transform/getfromdata";
import toFFontWeight from "./transform/fontweight";
import toConstraints from "./transform/constraints";
import toFBorderRadius from "./transform/border-radius";
import toFMarginPadding from "./transform/marginpadding";
import toDecorationImage from "./transform/background-image";

const mapping = (key, val, data) => {
  let result = { key: null, val: null };
  switch (key) {
    // background-image color ------------------------
    case "background-image":
      result["key"] = "image";
      result["val"] = toDecorationImage(val, data);
      break;

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

    // left & right ------------------------
    case "top":
    case "right":
    case "left":
    case "bottom":
      result["key"] = key;
      result["val"] = toFunit(val);
      break;

    // max-width & min-width ------------------------
    case "max-width":
    case "min-width":
    case "max-height":
    case "min-height":
      result["key"] = "constraints";
      result["val"] = toConstraints(val, data);
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
    case "letter-spacing":
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

    // border related ------------------------
    case "border-radius":
      result["val"] = toFBorderRadius(val);
      result["key"] =
        result["val"] === "BoxShape.circle" ? "shape" : "borderRadius";
      break;

    case "border":
      result["key"] = "border";
      result["val"] = toFBorder(val);
      break;

    // box-shadow ------------------------
    case "box-shadow":
      result["key"] = "boxShadow";
      result["val"] = toBoxShadow(val);
      break;

    default:
      result["val"] = val;
      break;
  }

  // to camel key
  const camelKey = transfromToCamelKey(key);
  if (camelKey) result["key"] = camelKey;

  return result;
};

/////////////////////////////////////////////////////////
//
//	To camel key
//
/////////////////////////////////////////////////////////
const transfromToCamelKey = key => {
  if (key === "letter-spacing") {
    return toCamel(key);
  }

  if (/^font-[a-zA-Z]+/gi.test(key) || /^text-[a-zA-Z]+/gi.test(key)) {
    return toCamel(key);
  }

  if (/^text-decoration.*/gi.test(key)) {
    return toCamel(key.replace(/^text-/gi, ""));
  }

  return null;
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
  } else if (key === "color" || key === "letter-spacing") {
    return true;
  } else {
    return false;
  }
};

const isDecoration = key => {
  if (
    key === "background-image" ||
    key === "background-color" ||
    key === "border" ||
    key === "box-shadow"
  ) {
    return true;
  } else if (key.indexOf("border") >= 0) {
    return true;
  } else {
    return false;
  }
};

const isPositioned = (key, val, data) => {
  const position = getFromData(data, "position");
  const hasPosition = position === "absolute" || position === "fixed";

  if (
    hasPosition &&
    (key === "top" || key === "left" || key === "right" || key === "bottom")
  ) {
    return true;
  }

  return false;
};

export { mapping, isText, isDecoration, isPositioned };
