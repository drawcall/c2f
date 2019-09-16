import mapping from "./mapping";
import {
  CONTAINER,
  TEXT,
  CHILDREN,
  END,
  TAB,
  CHILD,
  CLASS,
  PROP,
  CENTER
} from "./template";

class Widget {
  constructor(type) {
    this.children = [];
    this.type = type;

    switch (type) {
      case "container":
        this.template = CONTAINER;
        break;

      case "text":
        this.template = TEXT;
        break;

      default:
        this.template = CONTAINER;
    }

    this.code = this.template;
  }

  addChild(child) {
    if (this.children.indexOf(child) < 0) this.children.push(child);
  }

  prop(okey, oval) {
    let { key, val } = mapping(okey, oval);
    if (!key) return;

    let propVal;
    if (this.type === "text") {
      propVal = `
${TAB}${TAB}${key}: ${val},
${TAB}${TAB}${PROP}`.trim();
    } else {
      propVal = `
${TAB}${key}: ${val},
${TAB}${PROP}`.trim();
    }

    this.updateCode(PROP, propVal);
  }

  toCode() {
    if (this.children.length === 1) {
      const child = this.children[0];
      child.addTabSpace();
      child.clearTrashTags();

      const childCode = `child: ${child}`;
      this.updateCode(CHILD, childCode);
    }

    for (let i = 0; i < this.children; i++) {}

    return this.clearTrashTags();
  }

  clearTrashTags() {
    return this.code
      .replace(new RegExp(CHILDREN, "g"), "")
      .replace(new RegExp(CHILD, "g"), "")
      .replace(new RegExp(CLASS, "g"), "")
      .replace(new RegExp(PROP, "g"), "")
      .replace(new RegExp(END, "g"), "")
      .replace(new RegExp(/  \n/, "ig"), "");
  }

  updateCode(tag, tagVal) {
    this.code = this.code.replace(tag, tagVal);
  }

  addTabSpace(tag, tagVal) {
    this.code = this.code
      .replace(new RegExp(TAB, "ig"), `${TAB}${TAB}`)
      .replace(new RegExp(END, "ig"), `${TAB}`);
  }

  toString() {
    return this.code;
  }
}

export default Widget;
