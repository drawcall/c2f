import postcss from "postcss";
import parseCss from "./css/parse";
import repairCss from "./css/repair";
import parseFlutter from "./flutter/parse";
import { message } from "antd";

const convert2Flutter = async css => {
  try {
    const ast = await postcss([
      require("postcss-transform-shortcut")({})
      //require("postcss-short-border-radius")()
    ]).process(css);

    let result = await parseCss(ast.root);
    result = repairCss(result);

    const flutterStyle = parseFlutter(result);
    if (flutterStyle !== "")
      showMessage("success", "Has been converted successfully!");

    return flutterStyle;
  } catch (err) {
    const msg = dumpLogError(err);
    showMessage("error", msg);

    return "";
  }
};

const dumpLogError = err => {
  let msg;
  if (typeof err === "object") {
    if (err.message) {
      msg = "C2F - Message: " + err.message;
      console.log(`\n ${msg}`);
    }
    if (err.stack) {
      msg = msg || "C2F - Convert css 2 flutter error !";
      console.log("\nC2F - Stacktrace:");
      console.log("====================");
      console.log(err.stack);
    }
  } else {
    msg = "C2F - Convert css 2 flutter error !";
    console.log("C2F - dumpError :: argument is not an object");
  }

  return msg;
};

/////////////////////////////////////////////////////////
//
//	antd ui message
//
/////////////////////////////////////////////////////////
message.config({
  duration: 0.8,
  maxCount: 3
});
let first = true;
const showMessage = (type, msg) => {
  if (first) {
    first = false;
    return;
  }

  if (type === "success") message.success(msg);
  else message.error(msg);
};

export default convert2Flutter;
