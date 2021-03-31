import { addQuotes } from "../../../utils/str";

const toFFontFamily = val => {
  if (/^("|')/gi.test(val) && !/("|')$/gi.test(val)) {
    val = val.replace(/'/g, '"');
    val = val.split('"')[1];
  }

  return addQuotes(val);
};

export default toFFontFamily;
