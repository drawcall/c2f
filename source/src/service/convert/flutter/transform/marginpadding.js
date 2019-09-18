import isArray from "lodash/isArray";
import toFunit from "./unit";

const toFMarginPadding = val => {
  if (isArray(val)) {
    const top = toFunit(val[0]);
    const right = toFunit(val[1]);
    const bottom = toFunit(val[2]);
    const left = toFunit(val[3]);

    return `const EdgeInsets.only(top: ${top}, right: ${right}, bottom: ${bottom}, left: ${left})`;
  } else {
    val = toFunit(val);
    return `const EdgeInsets.only(top: ${val}, right: ${val}, bottom: ${val}, left: ${val})`;
  }
};

export default toFMarginPadding;
