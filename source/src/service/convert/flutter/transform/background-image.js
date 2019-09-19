import toCamel from "./camel";
import getFromData from "./getfromdata";

const toDecorationImage = (val, data) => {
  val += "";
  val = val.replace(/^url\(/g, "").replace(/\)$/g, "");

  let size = getFromData(data, "background-size");
  size = size || "cover";

  let repeat = getFromData(data, "background-repeat");
  repeat = toCamel(repeat || "no-repeat");

  return `
new DecorationImage(
  image: new ExactAssetImage('${val}'),
  fit: BoxFit.${size},
  repeat: ImageRepeat.${repeat},
)`.trim();
};

export default toDecorationImage;
