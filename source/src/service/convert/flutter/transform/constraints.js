import toFunit from "./unit";

const toConstraints = (val, decls) => {
  let bcVal = "";
  let maxWidth = decls.getVal("max-width");
  let minWidth = decls.getVal("min-width");
  let maxHeight = decls.getVal("max-height");
  let minHeight = decls.getVal("min-height");

  if (maxWidth) {
    bcVal += `maxWidth: ${toFunit(maxWidth)}`;
  }

  if (minWidth) {
    bcVal += `, minWidth: ${toFunit(minWidth)}`;
  }

  if (maxHeight) {
    bcVal += `, maxHeight: ${toFunit(maxHeight)}`;
  }

  if (minHeight) {
    bcVal += `, minHeight: ${toFunit(minHeight)}`;
  }

  return `BoxConstraints(${bcVal})`;
};

export default toConstraints;
