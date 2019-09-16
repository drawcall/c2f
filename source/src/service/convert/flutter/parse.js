import Widget from "./widget";

const parseFlutter = result => {
  if (!result || !result.length) return null;

  let container, text;
  container = new Widget("container");
  for (let i = 0; i < result.length; i++) {
    let style = result[i];
    let key = style["key"];
    let val = style["val"];

    if (isText(key)) {
      if (!text) text = new Widget("text");
      text.prop(key, val);
      container.addChild(text);
    } else {
      container.prop(key, val);
    }
  }

  const flutterStyle = container.toCode();
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
