//////////////////////////////////////////////////////
//
//  utils function
//
//////////////////////////////////////////////////////
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

const isNone = val => {
  if (!val) return true;

  if (typeof val === "string") {
    if (val.trim() === "") return true;
    if (val === "null") return true;
    if (val === "none") return true;
    if (val === "inhert") return true;
  }

  return false;
};

export { isMulti, isNone, findSimilarNumber };
