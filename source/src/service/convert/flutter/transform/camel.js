const toCamel = val => {
  let re = /-(\w)/g;
  return val.replace(re, function ($0, $1) {
    return $1.toUpperCase();
  });
};

export default toCamel;
