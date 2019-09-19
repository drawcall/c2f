import toFunit from "./unit";
import getFromData from "./getfromdata";

const toConstraints = (val, data) => {
  let bcVal = "";
  let maxWidth = getFromData(data, "max-width");
  let minWidth = getFromData(data, "min-width");
  let maxHeight = getFromData(data, "max-height");
  let minHeight = getFromData(data, "min-height");

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
