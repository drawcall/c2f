import ppo from "ppo";
import toNum from "./num";
import toRadian from "./radian";

// skewX(25deg) rotate3d(180deg,0,1) scale3d(2,2,1) translate3d(10px,10px,0px);
const toFTransform = val => {
  val = val.split(" ");

  let skew = findFromProp("skew", val);
  let scale = findFromProp("scale", val);
  let rotate = findFromProp("rotate", val);
  let translate = findFromProp("translate", val);

  let matrixval = "";
  skew = formatVal("skew", skew);
  scale = formatVal("scale", scale);
  rotate = formatVal("rotate", rotate);
  translate = formatVal("translate", translate);

  if(skew) matrixval += `${skew}..`;
  if(scale) matrixval += `${scale}..`;
  if(rotate) matrixval += `${rotate}..`;
  if(translate) matrixval += `${translate}..`;

  matrixval = matrixval.replace(/\.\.$/g, "");

  return `Matrix4.${matrixval}`;
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
  const r = /[a-zA-Z]+\((.*)\)/.exec(val);
  if (r && r.length >= 2) {
    let str = r[1];
    let strArr = str.split(",");
    let arr = [];

    if (key === "rotate") {
      let v = str.toString().replace(/deg$/g, "");
      v = toRadian(v);
      v = ppo.floor(v, 3);
      val = val.replace(str, v);
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
