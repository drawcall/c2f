import toFunit from "./transform/unit";
import toFColor from "./transform/color";
import toFBorder from "./transform/border";
import toBoxShadow from "./transform/boxshadow";
import toFTransform from "./transform/transform";
import toFFontWeight from "./transform/font-weight";
import toFFontFamily from "./transform/font-family";
import toConstraints from "./transform/constraints";
import toFBorderRadius from "./transform/border-radius";
import toAxisAlignment from "./transform/axis-alignment";
import toFMarginPadding from "./transform/marginpadding";
import toDecorationImage from "./transform/background-image";
import SPLIT_MAPPING from "../css/split-mapping";
import toCamel from "../../utils/camel";

const transform = (key, val, decls) => {
  const result = { key: null, val };

  switch (true) {
    // background-image color ------------------------
    case match(key, "background-image"):
      result["key"] = /^[a-zA-Z]+-gradient/gi.test(val) ? "gradient" : "image";
      result["val"] = toDecorationImage(val, decls);
      break;

    case match(key, "background-color", "color"):
      result["val"] = toFColor(val);
      if (val === "rgba(0, 0, 0, 0)") {
        result["key"] = null;
      } else {
        result["key"] = "color";
      }

      break;

    // width & height ------------------------
    case match(key, "width", "height"):
      result["key"] = key;
      result["val"] = toFunit(val);
      break;

    // left & right ------------------------
    case match(key, "top", "right", "left", "bottom"):
      result["key"] = key;
      result["val"] = toFunit(val);
      break;

    // max-width & min-width ------------------------
    case match(key, "max-width", "min-width"):
    case match(key, "max-height", "min-height"):
      result["key"] = "constraints";
      result["val"] = toConstraints(val, decls);
      break;

    // text decoration style ------------------------
    case match(key, "text-decoration-line"):
      result["key"] = "decoration";
      result["val"] = `TextDecoration.${toCamel(val)}`;
      break;

    case match(key, "text-decoration-color"):
      result["key"] = `decorationColor`;
      result["val"] = toFColor(val);
      break;

    case match(key, "text-decoration-style"):
      result["key"] = `decorationStyle`;
      result["val"] = `TextDecorationStyle.${val}`;
      break;

    case match(key, "text-align"):
      result["val"] = `TextAlign.${val}`;
      break;

    case match(key, "font-style"):
      result["val"] = `FontStyle.${val}`;
      break;

    case match(key, "font-weight"):
      result["val"] = toFFontWeight(val);
      break;

    case match(key, "font-size"):
    case match(key, "letter-spacing"):
      result["val"] = toFunit(val);
      break;

    case match(key, "font-family"):
      result["val"] = toFFontFamily(val);
      break;

    // padding margin ------------------------
    case match(key, "padding", "margin"):
      const mainStyleKey = key.replace(/-[a-zA-Z]+$/, "");
      result["key"] = mainStyleKey;
      result["val"] = toFMarginPadding(mainStyleKey, val, decls);
      break;

    // align items ------------------------
    case match(key, "justify-content"):
      result["key"] = "mainAxisAlignment";
      result["val"] = `MainAxisAlignment.${toAxisAlignment(val)}`;
      break;

    case match(key, "align-items"):
      result["key"] = "crossAxisAlignment";
      result["val"] = `CrossAxisAlignment.${toAxisAlignment(val)}`;
      break;

    // transform ------------------------
    case match(key, "transform"):
      result["key"] = "transform";
      result["val"] = toFTransform(val);
      break;

    // border related ------------------------
    case match(key, "border-radius"):
      result["val"] = toFBorderRadius(val, decls);
      result["key"] =
        result["val"] === "BoxShape.circle" ? "shape" : "borderRadius";
      break;

    case match(key, "border"):
      result["key"] = "border";
      result["val"] = toFBorder(val, decls);
      break;

    // box-shadow ------------------------
    case match(key, "box-shadow"):
      result["key"] = "boxShadow";
      result["val"] = toBoxShadow(val);
      break;

    // opacity ------------------------
    case match(key, "opacity"):
      result["key"] = key;
      result["val"] = val;
      break;

    default:
      // Didn't match any test
      break;
  }

  // to camel key
  const camelKey = transfromToCamelKey(key);
  if (camelKey) result["key"] = camelKey;

  return result;
};

/////////////////////////////////////////////////////////
//
//	match key
//
/////////////////////////////////////////////////////////
const match = (key, ...rest) => {
  for (let i = 0; i < rest.length; i++) {
    if (key === rest[i]) return true;
    if (inSplitStyles(key, rest[i])) return true;
  }

  return false;
};

const inSplitStyles = (key, sign) => {
  const subStyles = SPLIT_MAPPING[sign];
  if (!subStyles) return null;

  for (let i = 0; i < subStyles.length; i++) {
    if (key === subStyles[i]) return sign;
  }
  return null;
};

/////////////////////////////////////////////////////////
//
//	transfrom camel key
//
/////////////////////////////////////////////////////////
const transfromToCamelKey = (key) => {
  if (key === "letter-spacing") {
    return toCamel(key);
  }

  if (/^text-decoration.*/gi.test(key)) {
    return null;
  }

  if (/^font-[a-zA-Z]+/gi.test(key) || /^text-[a-zA-Z]+/gi.test(key)) {
    return toCamel(key);
  }

  return null;
};

export default transform;
