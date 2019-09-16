import clone from "lodash/clone";
import shorthand2Expansion from "./shorthand";

const repairCss = cssResult => {
  if (!cssResult) return;

  let result = clone(cssResult);
  for (let i = 0; i < cssResult.length; i++) {
    const style = cssResult[i];
    if (style.valueList.length > 1) {
      const shobj = shorthand2Expansion(style.key, style.valueList);
      if (shobj) {
        appendNewStyle(shobj, result);
        removeFromeArray(style.key, result);
      }
    }
  }

  return result;
};

const removeFromeArray = (key, arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i]["key"] === key) {
      arr.splice(i, 1);
    }
  }
};

const appendNewStyle = (newObj, arr) => {
  for (let key in newObj) {
    arr.push({
      key,
      val: newObj[key]
    });
  }
};

export default repairCss;
