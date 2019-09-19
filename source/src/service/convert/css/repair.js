import clone from "lodash/clone";
import jqFilterFix from "./jqfilterfix";
import { SHORTHAND_RULES, EXPANSION_RULES } from "./shorthand-config";
import { removeFromeArray, appendNewCssStyle, isMulti, findSimilarNumber } from "./utils";

const repairCss = cssResult => {
  if (!cssResult) return;

  let result;
  result = jqFilterFix(cssResult);
  result = shorthand2Expansion(result);
  result = expansion2Shorthand(result);

  return result;
};

// convert shorthand to expansion
const shorthand2Expansion = cssResult => {
  let result = clone(cssResult);
  // convert shorthand to expansion
  for (let i = 0; i < cssResult.length; i++) {
    const style = cssResult[i];
    const cssObj = unzipShorthand(style.key, style.valueList);
    if (cssObj) {
      appendNewCssStyle(cssObj, result);
      removeFromeArray(style.key, result);
    }
  }

  return result;
};

const unzipShorthand = (key, valueList) => {
  if (!SHORTHAND_RULES[key]) return null;

  const result = {};
  const rule = SHORTHAND_RULES[key];
  const index = findSimilarNumber(valueList.length, rule);
  const names = rule[index];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (isMulti(name)) {
      const multiName = name.split("|");
      for (let j = 0; j < multiName.length; j++) {
        result[multiName[j]] = valueList[i];
      }
    } else {
      result[name] = valueList[i];
    }
  }

  return result;
};

// convert shorthand to expansion
const expansion2Shorthand = cssResult => {
  const props = {};
  let result = clone(cssResult);

  for (let i = 0; i < cssResult.length; i++) {
    const style = cssResult[i];

    for (let key in EXPANSION_RULES) {
      const arr = EXPANSION_RULES[key];
      arr.forEach(name => {
        if (name === style.key) {
          if (!props[key]) props[key] = [];
          props[key].push(style.val);

          removeFromeArray(style.key, result);
        }
      });
    }
  }
  
  appendNewCssStyle(props, result);
  return result;
};

export default repairCss;
