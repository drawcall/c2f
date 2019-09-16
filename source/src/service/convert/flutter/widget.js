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
  REAL_SPACE
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
      propVal = `${key}: ${val},
${TAB}${TAB}${PROP}`.trim();
    } else {
      propVal = `${key}: ${val},
${TAB}${PROP}`.trim();
    }

    this.updateCode(`${PROP}`, propVal);
  }

  toCode() {
    if (this.children.length === 1) {
      const child = this.children[0];
      child.addSpaceTab();
      child.clearTrashTags();

      const childCode = `child: ${child}`;
      this.updateCode(CHILD, childCode);
    }

    for (let i = 0; i < this.children; i++) {}

    return this.clearTrashTags();
  }

  updateCode(tag, tagVal) {
    this.code = this.code.replace(tag, tagVal);
  }

  addSpaceTab() {
    const codeArr = this.code.split(/\n/g);
    codeArr.forEach((line, index) => {
      if (index !== 0) codeArr[index] = TAB + line;
    });
    this.code = codeArr.join("\n");
  }
  
  clearTrashTags() {
    this.code = this.code
      .replace(new RegExp(CHILDREN, "g"), "")
      .replace(new RegExp(CHILD, "g"), "")
      .replace(new RegExp(CLASS, "g"), "")
      .replace(new RegExp(PROP, "g"), "")
      .replace(new RegExp(END, "g"), "")
      .replace(new RegExp(TAB, "g"), REAL_SPACE);

    this.clearBlankLine();
    return this.code;
  }

  clearBlankLine() {
    const codeArr = this.code.split(/\n/g);
    for (let i = codeArr.length - 1; i >= 0; i--) {
      let line = codeArr[i];
      line = line.trim();
      if (!line) {
        codeArr.splice(i, 1);
      }
    }
    this.code = codeArr.join("\n");
  }

  toString() {
    return this.code;
  }
}

export default Widget;
