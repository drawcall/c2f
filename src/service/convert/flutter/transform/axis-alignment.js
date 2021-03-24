import toCamel from "../../../utils/camel";

const toAxisAlignment = val => {
  val = val.replace(/flex-/, "");
  return `${toCamel(val)}`;
};

export default toAxisAlignment;
