// Jquery is used here because it is a nice style parser.

import $ from "jquery";
import clone from "lodash/clone";
import { isNone, getFromData, removeFromeArray } from "./utils";

const jqFilterFix = cssResult => {
  let result = clone(cssResult);

  result = backgroundFix(result);

  return result;
};

const backgroundFix = cssResult => {
  const background = getFromData(cssResult, "background");

  if (background) {
    $("#avator").css("background", background);

    appendNewObj(cssResult, "background-color");
    appendNewObj(cssResult, "background-image");
    appendNewObj(cssResult, "background-position");
    appendNewObj(cssResult, "background-size");
    appendNewObj(cssResult, "background-repeat");

    removeFromeArray("background", cssResult);
  }

  return cssResult;
};

const appendNewObj = (cssResult, key) => {
  const val = getCssVal(cssResult, key);
  if (!isNone(val)) cssResult.push({ key, val });
};

const getCssVal = (cssResult, key) => {
  let val = $("#avator").css(key);
  if (isNone(val)) val = getFromData(cssResult, key);

  return val;
};

export default jqFilterFix;
