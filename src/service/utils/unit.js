const isNumerical = val => /^([0-9]+)$/gi.test(val.toString());

const isPercentage = val => /([0-9]+)%$/gi.test(val);

const isPixel = val => /([0-9]+)(px|dpx)$/gi.test(val);

const isEm = val => /([0-9]+)em$/gi.test(val);

const isRem = val => /([0-9]+)rem$/gi.test(val);

const isPt = val => /([0-9]+)pt$/gi.test(val);

export { isNumerical, isPercentage, isPixel, isPt, isEm, isRem };
