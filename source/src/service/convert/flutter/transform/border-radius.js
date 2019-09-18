import isArray from "lodash/isArray";
import toFunit from "./unit";

const toFBorderRadius = val => {
  if (isArray(val)) {
    let tl = toFunit(val[0]);
    let tr = toFunit(val[1]);
    let br = toFunit(val[2]);
    let bl = toFunit(val[3]);

    tl = `topLeft: Radius.circular(${tl})`;
    tr = `topRight: Radius.circular(${tr})`;
    br = `bottomRight: Radius.circular(${br})`;
    bl = `bottomLeft: Radius.circular(${bl})`;
    return `BorderRadius.only(${tl}, ${tr}, ${br}, ${bl})`;
  } else {
    val = toFunit(val);
    return `BorderRadius.only(top: ${val}, right: ${val}, bottom: ${val}, left: ${val})`;
  }
};

export default toFBorderRadius;
