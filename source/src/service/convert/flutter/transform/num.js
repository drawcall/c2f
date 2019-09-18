import toNumber from "lodash/toNumber";
import isNumber from "lodash/isNumber";

const toNum = val => {
  if (isNumber(val)) return val;

  const r = /([0-9]+)[a-zA-Z%]/gi.exec(`${val}c`);
  if (r && r.length >= 2) {
    val = r[1];
    val = isNumber(val) ? val : parseFloat(val);

    return val;
  } else {
    return toNumber(val);
  }
};

export default toNum;
