import getFromData from "./getfromdata";

const toDecorationImage = (val, data) => {
  val += "";
  val = val.replace(/^url\(/g, "").replace(/\)$/g, "");

  let size = getFromData(data, "background-size");
  size = size || "cover";

  return `
new DecorationImage(
  image: new ExactAssetImage('${val}'),
  fit: BoxFit.${size},
)`.trim();
};

export default toDecorationImage;