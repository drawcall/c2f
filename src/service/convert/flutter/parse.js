import { Widget, WidgetManager } from "./widget";
import {
  isRow,
  isCenter,
  isColumn,
  isText,
  isDecoration,
  isPositioned,
  isOpacity,
  isTransform
} from "./filter";

const parseFlutter = decls => {
  if (!decls || decls.isNull()) return "";

  let widget = new Widget("container");
  widget.decls = decls;
  const widgetManager = new WidgetManager();

  decls.forEach((decl, index) => {
    let key = decl["key"];
    let val = decl["val"];

    /// parent widget ---------------------------------------------
    // Positioned
    if (isPositioned({ key, val, decls })) {
      const parent = widgetManager.get({ target: "parent", type: "position" });
      parent.setProp(key, val);
      widget.addChildTo(parent);
    }

    // Opacity
    else if (isOpacity({ key, val, decls })) {
      const parent = widgetManager.get({ target: "parent", type: "opacity" });
      parent.setProp(key, val);
      widget.addChildTo(parent);
    }

    // Flex isCenter
    else if (isCenter({ key, val, decls })) {
      console.log(2222);
      const parent = widgetManager.get({ target: "parent", type: "center" });
      parent.setProp(key, val);
      widget.addChildTo(parent);
    }

    // Flex Row
    else if (isRow({ key, val, decls })) {
      const parent = widgetManager.get({ target: "parent", type: "row" });
      parent.setProp(key, val);
      widget.addChildTo(parent);
    }

    // Flex Column
    else if (isColumn({ key, val, decls })) {
      const parent = widgetManager.get({ target: "parent", type: "column" });
      parent.setProp(key, val);
      widget.addChildTo(parent);
    }

    // Transform
    else if (isTransform({ key, val, decls })) {
      const parent = widgetManager.get({ target: "parent", type: "transform" });
      parent.setProp(key, val);
      widget.addChildTo(parent);
    }

    /// child widget ---------------------------------------------
    // text
    else if (isText(key)) {
      const child = widgetManager.get({ target: "child", type: "text" });
      const keys = ["text-align"];
      if (keys.indexOf(key) > -1) {
        child.setProp2(key, val);
      } else {
        child.setProp(key, val);
      }
      widget.addChild(child);
    }

    /// self widget ---------------------------------------------
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

export default parseFlutter;
