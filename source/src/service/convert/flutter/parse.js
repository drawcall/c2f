import Widget from "./widget";

const parseFlutter = decls => {
  if (!decls || decls.isNull()) return "";

  let cache = {};
  let widget;
  widget = new Widget("container");
  widget.decls = decls;

  decls.forEach((decl, index) => {
    let key = decl["key"];
    let val = decl["val"];

    /// parent widget ---------------
    // Positioned
    if (isPositioned(key, val, decls)) {
      if (!cache["_parent.position"]) cache["_parent.position"] = new Widget("position");

      const parent = cache["_parent.position"];
      parent.setProp(key, val);
      widget.addChildTo(parent);
    } 

    // Opacity
    else if (isOpacity(key, val, decls)) {
      if (!cache["_parent.opacity"]) cache["_parent.opacity"] = new Widget("opacity");

      const parent = cache["_parent.opacity"];
      parent.setProp(key, val);
      widget.addChildTo(parent);
    } 

    /// child widget ---------------
    // text
    else if (isText(key)) {
      if (!cache["_child.text"]) cache["_child.text"] = new Widget("text");

      const child = cache["_child.text"];
      child.setProp(key, val);
      widget.addChild(child);
    }


    /// self widget ---------------
    // decoration
    else if (isDecoration(key)) {
      widget.setDecoration(key, val);
    } 

    // prop
    else {
      widget.setProp(key, val);
    }
  });

  return widget.getRoot().toString();
};

/////////////////////////////////////////////////////////
//
//	Filter Func
//
/////////////////////////////////////////////////////////
const isText = key => {
  if (key.indexOf("font") === 0) {
    return true;
  } else if (key.indexOf("text-") === 0) {
    return true;
  } else if (key === "color" || key === "letter-spacing") {
    return true;
  } else {
    return false;
  }
};

const isDecoration = key => {
  if (
    key === "background-image" ||
    key === "background-color" ||
    key === "border" ||
    key === "box-shadow"
  ) {
    return true;
  } else if (key.indexOf("border") >= 0) {
    return true;
  } else {
    return false;
  }
};

const isPositioned = (key, val, decls) => {
  const position = decls.getVal("position");
  const hasPosition = position === "absolute" || position === "fixed";

  const isTLRBAttr = hasPosition && (
    key === "top" ||
    key === "left" ||
    key === "right" ||
    key === "bottom"
  );

  const isPositionAttr = key === "position" &&
    (val === "absolute" || val === "fixed");

  if (isTLRBAttr || isPositionAttr) {
    return true;
  }

  return false;
};

const isOpacity = (key, val, decls) => {
  if (key === "opacity" ) {
    return true;
  }

  return false;
};

export default parseFlutter;
