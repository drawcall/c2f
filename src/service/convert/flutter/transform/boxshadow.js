import trim from "lodash/trim";
import toFunit from "./unit";
import toColor from "./color";

// 0 2px 4px rgba(0, 0, 0, 0.8);
const toBoxShadow = val => {
  let shadows = "";
  val = replaceRbga2Sign(val);
  const arr = val.split(",");
  for (let i = 0; i < arr.length; i++) {
    const shadowStr = replaceSign2Rgba(trim(arr[i]));
    const shadow = createBoxShadow(shadowStr);
    shadows += "\n" + shadow;
  }

  return `
<BoxShadow>[
${shadows}
]`.trim();
};

const createBoxShadow = val => {
  val = toArray(val);
  const x = toFunit(val[0]);
  const y = toFunit(val[1]);
  const offset = `Offset(${x}, ${y})`;
  const color = toColor(val[3] || "#000000");
  const blurRadius = toFunit(val[2] || 10);

  return `
  BoxShadow (
    color: ${color},
    offset: ${offset},
    blurRadius: ${blurRadius},
  ),`;
};

/// replaceRbga2Sign and replaceSign2Rgba
let i = 0;
const rgbas = {};
const replaceRbga2Sign = str => {
  return str.replace(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/gi, val => {
    const key = `__${i++}__`;
    rgbas[key] = val;
    return key;
  });
};

const replaceSign2Rgba = str => {
  for (let key in rgbas) {
    str = str.replace(key, rgbas[key]);
  }
  return str;
};

const toArray = val => {
  let arr = val.trim().split(" ");
  if (arr.length > 4) {
    let str = "";
    for (let i = 3; i < arr.length; i++) {
      str += arr[i];
    }

    arr = arr.slice(0, 4);
    arr[3] = str;
  }

  return arr;
};

export default toBoxShadow;
