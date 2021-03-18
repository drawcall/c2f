const split2Arr = (val, sign = ")") => {
  const arr = val.split(`${sign} `);
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    const reg = new RegExp(`\\${sign}$`, "gi");
    if (!reg.test(str)) arr[i] = str + sign;
  }
  return arr;
};

export { split2Arr };
