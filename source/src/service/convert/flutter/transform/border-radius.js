import isArray from "lodash/isArray";
import toFunit from "./unit";

const toFBorderRadius = val => {
  if (isArray(val)) {
    if (isAllEqual(val)) {
      if (val[0] === "50%") {
        return `BoxShape.circle`;
      } else {
        const brVal = toFunit(val[0]);
        return `BorderRadius.all(const Radius.circular(${brVal}),)`;
      }
    } else {
      let tl = toFunit(val[0]);
      let tr = toFunit(val[1]);
      let br = toFunit(val[2]);
      let bl = toFunit(val[3]);

      tl = `topLeft: Radius.circular(${tl})`;
      tr = `topRight: Radius.circular(${tr})`;
      br = `bottomRight: Radius.circular(${br})`;
      bl = `bottomLeft: Radius.circular(${bl})`;

      return `BorderRadius.only(${tl}, ${tr}, ${br}, ${bl})`;
    }
  } else {
    val = toFunit(val);
    return `BorderRadius.all(const Radius.circular(${val}),)`;
  }
};

const isAllEqual = array => {
  if (array.length > 0) {
    return !array.some(function(value, index) {
      return value !== array[0];
    });
  } else {
    return true;
  }
};

export default toFBorderRadius;
