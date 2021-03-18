import trim from "lodash/trim";
import { split2Arr } from "../../../utils/arr";
import { toNum, toRadian } from "../../../utils/num";

// skewX(25deg) rotate3d(180deg,0,1) scale3d(2,2,1) translate3d(10px,10px,0px);
const toFTransform = val => {
  val = trim(val);
  if (/^matrix/gi.test(val)) {
    return val.replace("matrix", "Matrix4");
  } else {
    const arr = split2Arr(val);

    let skew = findFromProp("skew", arr);
    let scale = findFromProp("scale", arr);
    let rotate = findFromProp("rotate", arr);
    let translate = findFromProp("translate", arr);

    let matrixval = "";
    skew = formatVal("skew", skew);
    scale = formatVal("scale", scale);
    rotate = formatVal("rotate", rotate);
    translate = formatVal("translate", translate);

    if (skew) matrixval += `${skew}..`;
    if (scale) matrixval += `${scale}..`;
    if (rotate) matrixval += `${rotate}..`;
    if (translate) matrixval += `${translate}..`;
    matrixval = matrixval.replace(/\.\.$/g, "");

    return `Matrix4.${matrixval}`;
  }
};

const findFromProp = (name, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(name) > -1) {
      return arr[i];
    }
  }
  return null;
};

const formatVal = (key, val) => {
  if (!val) return null;

  const r = /[a-zA-Z]+\((.*)\)/.exec(val);
  if (r && r.length >= 2) {
    let str = r[1];
    let strArr = str.split(",");
    let arr = [];

    if (key === "rotate") {
      const radian = toRadian(str);
      val = val.replace(str, radian);
    } else {
      strArr.forEach(n => {
        n = toNum(n);
        arr.push(n);
      });
      const newVal = arr.join(",");
      val = val.replace("3d", "").replace(str, newVal);
    }
  }

  return val;
};

export default toFTransform;
