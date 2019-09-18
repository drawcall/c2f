import isArray from "lodash/isArray";
import toFunit from "./unit";
import toColor from "./color";

const toFBorder = val => {
  if (isArray(val)) {
    let width = toFunit(val[0]);
    let color = toColor(val[2] || "blue");
    let style = val[1] || "solid";

    return `
new Border.all(
  color: ${color},
  width: ${width},
  style: BorderStyle.${style}
)`.trim();
  } else {
    val = toFunit(val);
    return `
new Border.all(
  width: ${val},
)`.trim();
  }
};

export default toFBorder;
