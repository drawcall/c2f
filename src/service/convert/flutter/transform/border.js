import toFunit from "./unit";
import toColor from "./color";

const toFBorder = (val, decls) => {
  let width = decls.getVal("border-width", "1px");
  let color = decls.getVal("border-color", "blue");
  let style = decls.getVal("border-style", "solid");

  width = toFunit(width);
  color = toColor(color);

  return `
Border.all(
  color: ${color},
  width: ${width},
  style: BorderStyle.${style}
)`.trim();
};

export default toFBorder;
