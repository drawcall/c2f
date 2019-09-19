import isInteger from "lodash/isInteger";
import isNumber from "lodash/isNumber";
import toNum from "./num";

const toFunit = val => {
  if (isNumber(val)) return val;

  val += "";

  // like "250"
  if (/^([0-9]+)$/gi.test(val)) {
    return toNum(val);
  }

  // like 50%
  else if (/([0-9]+)%$/gi.test(val)) {
    val = toNum(val) / 100;
    return `_parent_ * ${val} // percentage of parent width. like 'MediaQuery.of(context).size.width * 0.2'`;
  }

  // like 120px
  else if (/([0-9]+)(px|dpx)$/gi.test(val)) {
    val = toNum(val);
    val = isInteger(val) ? `${val}.0` : `${val}`;
    return val;
  }

  // like 3.2em
  else if (/([0-9]+)em$/gi.test(val)) {
    val = toNum(val);
    return `_parent_font_width_ * ${val} // https://www.w3.org/Style/Examples/007/units`;
  }

  // like 10rem
  else if (/([0-9]+)rem$/gi.test(val)) {
    val = toNum(val);
    return `_root_font_width_ * ${val} // https://www.w3.org/Style/Examples/007/units`;
  }

  // like 12pt
  else if (/([0-9]+)pt$/gi.test(val)) {
    val = toNum(val);
    return `${val} * 72 / _dpi_ // pt = px * dpi / 72`;
  } else {
    return 0;
  }
};

export default toFunit;
