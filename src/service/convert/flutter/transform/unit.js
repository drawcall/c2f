import isNumber from "lodash/isNumber";
import isInteger from "lodash/isInteger";
import { toNum } from "../../../utils/num";
import { isNumerical, isPercentage, isPixel, isEm, isRem, isPt } from "../../../utils/unit";

const toFunit = val => {
  if (isNumber(val)) return val;

  val += "";

  // like "250"
  if (isNumerical(val)) {
    return toNum(val);
  }

  // like 50%
  else if (isPercentage(val)) {
    val = toNum(val) / 100;
    return `_parent_ * ${val} // percentage of parent width. like 'MediaQuery.of(context).size.width * 0.2'`;
  }

  // like 120px
  else if (isPixel(val)) {
    val = toNum(val);
    val = isInteger(val) ? `${val}.0` : `${val}`;
    return val;
  }

  // like 3.2em
  else if (isEm(val)) {
    val = toNum(val);
    return `_parent_font_width_ * ${val} // https://www.w3.org/Style/Examples/007/units`;
  }

  // like 10rem
  else if (isRem(val)) {
    val = toNum(val);
    return `_root_font_width_ * ${val} // https://www.w3.org/Style/Examples/007/units`;
  }

  // like 12pt
  else if (isPt(val)) {
    val = toNum(val);
    return `${val} * 72 / _dpi_ // pt = px * dpi / 72`;
  } else {
    return 0;
  }
};

export default toFunit;
