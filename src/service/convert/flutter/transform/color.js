import color from "color";

const toFColor = val => {
  try {
    val = typeof val === "string" ? val.trim() : val;
    const c16 = color(val)
      .hex()
      .replace(/^#/, "0x");

    return `Color(${c16}00)`;
  } catch (e) {
    const c16 = (val + "").replace(/^#/, "0x");
    return `Color(${c16}00)`;
  }
};

export default toFColor;
