const intercept = (val, dot) => {
  val += "";
  val = val.split(" " || dot);
  return val[0];
};

export default intercept;
