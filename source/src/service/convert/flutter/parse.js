import Widget from "./widget";
import { isText, isDecoration } from "./mapping";

const parseFlutter = result => {
  if (!result || !result.length) return "";

  let widget1, widget2, widget3, widget4;
  widget1 = new Widget("container");
  widget1.data = result;

  for (let i = 0; i < result.length; i++) {
    let style = result[i];
    let key = style["key"];
    let val = style["val"];

    if (isDecoration(key)) {
      widget1.setDecoration(key, val);
    } else {
      if (isText(key)) {
        if (!widget2) widget2 = new Widget("text");
        widget2.setProp(key, val);
        widget1.addChild(widget2);
      } else {
        widget1.setProp(key, val);
      }
    }
  }

  const flutterStyle = widget1.toString();
  return flutterStyle || "";
};

export default parseFlutter;
