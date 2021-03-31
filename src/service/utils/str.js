const addQuotes = str => {
  if (!/^("|')/gi.test(str)) {
    str = `"${str}"`;
  }
  return str;
};

const getLast = str => {
  return str.charAt(str.length - 1);
};

export { addQuotes, getLast };
