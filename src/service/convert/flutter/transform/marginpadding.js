import toFunit from "./unit";

const toFMarginPadding = (key, val, decls) => {
  let top = decls.getVal(`${key}-top`, 0);
  let right = decls.getVal(`${key}-right`, 0);
  let bottom = decls.getVal(`${key}-bottom`, 0);
  let left = decls.getVal(`${key}-left`, 0);

  if (top === right && right === bottom && bottom === left) {
    top = toFunit(top);

    return `const EdgeInsets.all(${top})`;
  } else {
    top = toFunit(top);
    right = toFunit(right);
    bottom = toFunit(bottom);
    left = toFunit(left);

    return `const EdgeInsets.only(top: ${top}, right: ${right}, bottom: ${bottom}, left: ${left})`;
  }
};

export default toFMarginPadding;
