import isInteger from "lodash/isInteger";
import toNumber from "lodash/toNumber";

const toFunit = val => {
  val = val.replace(/(px|dpx)$/, "");
  val = toNumber(val);
  if (isInteger(val)) val = `${val}.0`;
  else val = `${val}`;

  return val;
};

export default toFunit;
