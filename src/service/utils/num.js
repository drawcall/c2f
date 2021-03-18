import ppo from "ppo";
import toNumber from "lodash/toNumber";
import isNumber from "lodash/isNumber";

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

const toNum = val => {
  if (isNumber(val)) return val;

  const r = /([-0-9.]+)[a-zA-Z%]/gi.exec(`${val}c`);
  if (r && r.length >= 2) {
    val = r[1];
    val = isNumber(val) ? val : parseFloat(val);
    return val;
  } else {
    return toNumber(val);
  }
};

const toRadian = (val, fl = 3) => {
  let radian = val.toString().replace(/deg$/g, "");
  radian = (radian * Math.PI) / 180;
  return ppo.floor(radian, fl);
};

const toRound = (val, n = 3) => {
  const d = Math.pow(10, n);
  const num = Math.round(val * d);
  return num / d;
};

export { isMulti, isNone, toNum, findSimilarNumber, toRadian, toRound };
