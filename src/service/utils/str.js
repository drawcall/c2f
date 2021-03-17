const addQuotes = str => {
  if (!/^("|')/gi.test(str)) {
    str = `"${str}"`;
  }
  return str;
};

export default addQuotes;
