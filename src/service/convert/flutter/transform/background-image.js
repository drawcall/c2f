import toCamel from "../../../utils/camel";
import { toNameVal } from "../../../utils/pos";

const toDecorationImage = (val, decls) => {
  val += "";
  val = val.replace(/^url\(/g, "").replace(/\)$/g, "");
  if (!/^('|")/.test(val)) {
    val = `"${val}"`;
  }

  const size = decls.getVal("background-size", "cover");
  let repeat = decls.getVal("background-repeat", "no-repeat");
  repeat = toCamel(repeat);
  let position = decls.getVal("background-position", "center");
  position = toNameVal(position);

  return `
new DecorationImage(
  image: new ExactAssetImage(${val}),
  fit: BoxFit.${size},
  repeat: ImageRepeat.${repeat},
)`.trim();
};

export default toDecorationImage;
