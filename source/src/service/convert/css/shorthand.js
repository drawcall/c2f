const RULES = {
  border: {
    "3": ["border-width", "border-style", "border-color"],
    "2": ["border-width", "border-style"],
    "1": ["border-width"]
  },
  padding: {
    "4": ["padding-top", "padding-right", "padding-bottom", "padding-left"],
    "2": ["padding-top|padding-bottom", "padding-left|padding-right"],
    "1": ["padding-top|padding-right|padding-bottom|padding-right"]
  },
  margin: {
    "4": ["margin-top", "margin-right", "margin-bottom", "margin-left"],
    "2": ["margin-top|margin-bottom", "margin-left|margin-right"],
    "1": ["margin-top|margin-right|margin-bottom|margin-right"]
  },
  font: {
    "5": [
      "font-style",
      "font-variant",
      "font-weight",
      "font-size",
      "font-family"
    ],
    "4": ["font-style", "font-weight", "font-size", "font-family"],
    "3": ["font-weight", "font-size", "font-family"]
  }
};

const shorthand2Expansion = (key, valueList) => {
  if (!RULES[key]) return null;

  const result = {};
  const rule = RULES[key];
  const index = findSimilarNumber(valueList.length, rule);
  const names = rule[index];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (isMulti(name)) {
      const multiName = name.split("|");
      for (let j = 0; j < multiName.length; j++) {
        result[multiName[j]] = valueList[i];
      }
    } else {
      result[name] = valueList[i];
    }
  }

  return result;
};

const isMulti = key => {
  if (key.indexOf("|") > 0) return true;
  else return false;
};

const findSimilarNumber = (n, rule) => {
  if (rule[n + ""]) return n;

  const nums = [];
  for (let key in rule) {
    nums.push(parseInt(key));
  }
  nums.sort((n1, n2) => n2 - n1);

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (n > num) return num;
  }

  return 0;
};

export default shorthand2Expansion;
