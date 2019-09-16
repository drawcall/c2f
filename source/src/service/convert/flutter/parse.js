import Widget from "./widget";

const parseFlutter = result => {
  if (!result || !result.length) return null;

  let widget1, widget2, widget3, widget4;
  widget1 = new Widget("container");
  for (let i = 0; i < result.length; i++) {
    let style = result[i];
    let key = style["key"];
    let val = style["val"];

    if (isText(key)) {
      if (!widget2) widget2 = new Widget("text");
      widget2.setProp(key, val);
      widget1.addChild(widget2);
    } else {
      widget1.setProp(key, val);
    }
  }

  const flutterStyle = widget1.toString();
  return flutterStyle;
};

// filter function
const isText = key => {
  if (key.indexOf("font") === 0) {
    return true;
  } else if (key === "color") {
    return true;
  } else {
    return false;
  }
};

export default parseFlutter;
