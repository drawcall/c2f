//import toNumber from "lodash/toNumber";

const toFFontWeight = val => {
  if (val === "bold" || val === "normal") {
    return `FontWeight.${val}`;
  } else if (/^[1-9]00/.test(val + "")) {
    return `FontWeight.w${val}`;
  } else {
    return `FontWeight.normal`;
  }
};

export default toFFontWeight;
