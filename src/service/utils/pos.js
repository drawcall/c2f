import toCamel from "./camel";

const isPercentage = val => {
  if (val.indexOf("%") > 0) {
    return true;
  }
  return false;
};

const isName = val => {
  const keynames = "left|center|bottom|top|right".split("|");
  for (let i = 0; i < keynames.length; i++) {
    if (val.indexOf(keynames[i]) === 0) {
      return true;
    }
  }
  return false;
};

// 0% 50% -> leftCenter
// center left -> centerLeft
const toNameVal = val => {
  let result = "";
  if (isPercentage(val)) {
    const arr = val.split(" ");
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        if (arr[i] === "0%") {
          result += "top";
        } else if (arr[i] === "50%") {
          result += "center";
        } else {
          result += "bottom";
        }
      } else {
        if (arr[i] === "0%") {
          result += "-left";
        } else if (arr[i] === "50%") {
          result += "-center";
        } else {
          result += "-right";
        }
      }
    }
  } else {
    result.replace(/\s/gi, "-");
  }

  result = toCamel(result);
  result = result === "centerCenter" ? "center" : result;
  return result;
};

export { isPercentage, isName, toNameVal };
