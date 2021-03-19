import toFunit from "./unit";

const toFBorderRadius = (val, decls) => {
  let tl = decls.getVal("border-top-left-radius", 0);
  let tr = decls.getVal("border-top-right-radius", 0);
  let br = decls.getVal("border-bottom-right-radius", 0);
  let bl = decls.getVal("border-bottom-left-radius", 0);

  if (tl === tr && tr === br && br === bl) {
    if (tl === "50%") {
      return `BoxShape.circle`;
    } else {
      return `BorderRadius.all(const Radius.circular(${toFunit(tl)}))`;
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
};

export default toFBorderRadius;
