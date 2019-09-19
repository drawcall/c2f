import Widget from "./widget";
import { isText, isDecoration, isPositioned } from "./mapping";

const parseFlutter = result => {
  if (!result || !result.length) return "";

  let widget0, widget1, widget2;
  widget0 = new Widget("position");
  widget1 = new Widget("container");
  widget1.data = result;

  for (let i = 0; i < result.length; i++) {
    let style = result[i];
    let key = style["key"];
    let val = style["val"];

    if (isPositioned(key, val, result)) {
      widget0.setProp(key, val);
      widget0.addChild(widget1);
    } else if (isDecoration(key)) {
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

  const flutterStyle = widget0.enabled
    ? widget0.toString()
    : widget1.toString();

  return flutterStyle || "";
};

export default parseFlutter;
