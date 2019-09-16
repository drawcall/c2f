import mapping from "./mapping";
import {
  CONTAINER,
  TEXT,
  CHILDREN,
  TAB,
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

    this.codeString = "";
    this.codeLines = this.template.split(/\n/g);
  }

  addChild(child) {
    if (this.children.indexOf(child) < 0) {
      this.children.push(child);
    }
  }

  setProp(okey, oval) {
    let { key, val } = mapping(okey, oval);
    if (!key) return;

    let propVal;
    if (this.type === "text") {
      propVal = `    ${key}: ${val}, `;
    } else {
      propVal = `  ${key}: ${val},`;
    }

    this.insertPropToCodeLines(propVal);
  }

  insertPropToCodeLines(propVal) {
    const index = this.getPseudoTagIndex(PROP);
    if (index > 0) {
      this.codeLines.splice(index, 0, propVal);
      this.mergeToCodeString();
    }
  }

  getPseudoTagIndex(tagName) {
    for (let i = 0; i < this.codeLines.length; i++) {
      const line = this.codeLines[i];
      if (line.indexOf(tagName) > -1) {
        return i;
      }
    }
    return 0;
  }

  addSpaceEveryLine() {
    this.codeLines.forEach((line, index) => {
      if (index !== 0) this.codeLines[index] = TAB + line;
    });
  }

  mergeToCodeString() {
    this.codeString = this.codeLines.join("\n");
  }

  clearAllPseudoTags() {
    this.codeString = this.codeString
      .replace(new RegExp(CHILDREN, "g"), "")
      .replace(new RegExp(CLASS, "g"), "")
      .replace(new RegExp(PROP, "g"), "")
      .replace(new RegExp(TAB, "g"), REAL_SPACE);
  }

  clearBlankLines() {
    const codeArr = this.codeString.split(/\n/g);
    for (let i = codeArr.length - 1; i >= 0; i--) {
      const line = codeArr[i].trim();
      if (!line) {
        codeArr.splice(i, 1);
      }
    }

    this.codeString = codeArr.join("\n");
  }

  replaceChildren(child) {
    for (let i = 0; i < this.codeLines.length; i++) {
      const line = this.codeLines[i];
      if (line.indexOf(CHILDREN) > -1) {
        this.codeLines[i] = line.replace(CHILDREN, `child: ${child}`);
      }
    }
  }

  toString() {
    if (this.children.length > 0) {
      if (this.children.length === 1) {
        const child = this.children[0];
        child.addSpaceEveryLine();
        this.replaceChildren(`child: ${child.toString()}`);
      } else {
        for (let i = 0; i < this.children; i++) {}
      }
    }

    // merge code string
    this.mergeToCodeString();
    this.clearAllPseudoTags();
    this.clearBlankLines();
    return this.codeString;
  }
}

export default Widget;
