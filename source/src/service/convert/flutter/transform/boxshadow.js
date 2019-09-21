import toFunit from "./unit";
import toColor from "./color";

// 0 2px 4px rgba(0, 0, 0, 0.8);
const toBoxShadow = val => {
  val = toArray(val);
  
  const x = toFunit(val[0]);
  const y = toFunit(val[0]);
  const offset = `Offset(${x}, ${y})`;
  const color = toColor(val[3] || "#000");
  const blurRadius = toFunit(val[2] || 10);

  const allStr = `
  BoxShadow (
    color: ${color},
    offset: ${offset},
    blurRadius: ${blurRadius},
  ),`;

  return `
<BoxShadow>[
${allStr}
]`.trim();
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
