import toColor from "./color";
import toCamel from "../../../utils/camel";
import { toNameVal } from "../../../utils/pos";
import { toRound, toRadian, toNum } from "../../../utils/num";

const toDecorationImage = (val, decls) => {
  val = String(val);

  /// background-image = linear-gradient
  if (/^linear-gradient/gi.test(val)) {
    return createLineGradient(val, decls);
  }

  if (/^radial-gradient/gi.test(val)) {
    return createRadialGradient(val, decls);
  }

  /// background-image - a.jpg
  else {
    return createBgImage(val, decls);
  }
};

const createLineGradient = (val, decls) => {
  const colors = [];
  const steps = [];
  let end;
  const arr = val
    .replace(/^[a-zA-Z]+-gradient/gi, "")
    .replace("(", "")
    .replace(")", "")
    .split(",");

  if (arr.length > 2) {
    const d = arr[0];
    end = d.replace("to", "").trim();
    let stepsVal, colorsVal;

    for (let i = 1; i < arr.length; i++) {
      const color = String(arr[i]).trim();
      if (/\d{0,2}%$/gi.test(color)) {
        colorsVal = color.split(" ")[0];
        stepsVal = toNum(color.split(" ")[1]) / 100;
        steps.push(stepsVal);
      } else {
        colorsVal = color;
      }

      colors.push(toColor(colorsVal));
    }
  } else {
    end = "bottom";
    const c1 = arr[0];
    const c2 = arr[1] || arr[0];
    colors.push(toColor(c1));
    colors.push(toColor(c2));
  }

  let result = `
LinearGradient(
  begin: Alignment(0.0, 0.0),
  end: ${getEnd(end)},
  colors: [${colors}],
)`.trim();

  if (steps.length) {
    result = result.replace(
      /\)$/gi,
      `
  steps: [${steps}]
)`
    );
  }

  return result;
};

const createRadialGradient = (val, decls) => {
  const colors = [];
  const arr = val
    .replace(/^[a-zA-Z]+-gradient/gi, "")
    .replace("(", "")
    .replace(")", "")
    .split(",");

  for (let i = 0; i < arr.length; i++) {
    if (/^(circle|farthest|closest|ellipse)/.test(arr[i])) continue;
    colors.push(toColor(arr[i]));
  }

  return `
RadialGradient(
  colors: [${colors}]
)`.trim();
};

const getEnd = (end) => {
  let angle;
  let n = 20;
  if (end === "right") {
    angle = toRadian(90, n);
  } else if (end === "top") {
    angle = toRadian(0, n);
  } else if (end === "left") {
    angle = toRadian(-90, n);
  } else if (end === "bottom") {
    angle = toRadian(180, n);
  } else {
    angle = toRadian(end, n);
  }

  angle -= Math.PI / 2;
  const x = toRound(Math.cos(angle));
  const y = toRound(Math.sin(angle));
  return `Alignment(${x}, ${y})`;
};

const createBgImage = (val, decls) => {
  val = val.replace(/^url\(/g, "").replace(/\)$/g, "");
  if (!/^('|")/.test(val)) val = `"${val}"`;

  const size = decls.getVal("background-size", "cover");
  let repeat = decls.getVal("background-repeat", "no-repeat");
  repeat = toCamel(repeat);
  let position = decls.getVal("background-position", "center");
  position = toNameVal(position);

  return `
DecorationImage(
  image: ExactAssetImage(${val}),
  fit: BoxFit.${size},
  repeat: ImageRepeat.${repeat},
)`.trim();
};

export default toDecorationImage;
