import { mapping } from "./mapping";
import {
  CONTAINER,
  TEXT,
  CHILDREN,
  TAB,
  CLASS,
  PROP,
  DECO,
  REAL_SPACE
} from "./template";

class Widget {
  constructor(type) {
    this.children = [];
    this.type = type;
    this.data = null;

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
    this.decoration = [];
  }

  addChild(child) {
    if (this.children.indexOf(child) < 0) {
      this.children.push(child);
    }
  }

  setProp(okey, oval) {
    let { key, val } = mapping(okey, oval, this.data);
    if (!key) return;

    let propVal;
    if (this.type === "text") {
      propVal = `    ${key}: ${val}, `;
    } else {
      propVal = `  ${key}: ${val},`;
    }

    this.insertPropToCodeLines(key, propVal);
  }

  setDecoration(okey, oval) {
    let { key, val } = mapping(okey, oval, this.data);
    if (!key) return;

    const decoVal = `${key}: ${val},`;
    this.decoration.push(decoVal);
  }

  insertPropToCodeLines(key, propVal) {
    let index;
    // if has the same key -> replace
    index = this.getTheSameProp(key);
    if (index > -1) {
      this.codeLines[index] = propVal;
    } else {
      // get <-prop-> tag index, and insertBefore
      index = this.getPseudoTagIndex(PROP);
      if (index > 0) {
        this.codeLines.splice(index, 0, propVal);
      }
    }
  }

  getTheSameProp(key) {
    for (let i = 0; i < this.codeLines.length; i++) {
      const line = this.codeLines[i];
      if (line.indexOf(`${key}:`) > -1) {
        return i;
      }
    }
    return -1;
  }

  getPseudoTagIndex(tagName) {
    for (let i = 0; i < this.codeLines.length; i++) {
      const line = this.codeLines[i];
      if (line.indexOf(tagName) > -1) {
        return i;
      }
    }
    return -1;
  }

  addSpaceEveryLine() {
    this.codeLines = addSpaceEveryLine(this.codeLines, 1);
  }

  clearAllPseudoTags() {
    this.codeString = this.codeString
      .replace(new RegExp(CHILDREN, "g"), "")
      .replace(new RegExp(CLASS, "g"), "")
      .replace(new RegExp(PROP, "g"), "")
      .replace(new RegExp(DECO, "g"), "")
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

  replaceByPseudoTag(pseudoTag, val) {
    for (let i = 0; i < this.codeLines.length; i++) {
      const line = this.codeLines[i];
      if (line.indexOf(pseudoTag) > -1) {
        this.codeLines[i] = line.replace(pseudoTag, `${val}`);
      }
    }
  }

  selfLinesToCodeString() {
    this.codeString = this.codeLines.join("\n");
  }

  childToCodeString(child) {
    child.addSpaceEveryLine();
    this.replaceByPseudoTag(CHILDREN, `child: ${child.toString()}`);
  }

  decorationToCodeString() {
    if (this.decoration.length > 0) {
      this.decoration = addSpaceEveryLine(this.decoration, 2, true);
      let decoration = this.decoration.join("\n");
      decoration = `decoration: BoxDecoration(
${decoration}
  )`;

      this.replaceByPseudoTag(DECO, decoration);
    }
  }

  toString() {
    if (this.children.length > 0) {
      if (this.children.length === 1) {
        const child = this.children[0];
        this.childToCodeString(child);
      } else {
        for (let i = 0; i < this.children; i++) {}
      }
    }

    // merge code string
    this.decorationToCodeString();
    this.selfLinesToCodeString();
    this.clearAllPseudoTags();
    this.clearBlankLines();
    return this.codeString;
  }
}

/////////////////////////////////////////////////////////
//
//	Utils Func
//
/////////////////////////////////////////////////////////
const addSpaceEveryLine = (lines, n = 1, multi = false) => {
  let tabs = "";
  for (let i = 0; i < n; i++) {
    tabs += TAB;
  }

  lines.forEach((line, index) => {
    if (multi) {
      lines[index] = forEachLines(line, (l, i, lineArr) => {
        // if (i !== 0)
        lineArr[i] = tabs + l;
      });
    } else {
      if (index !== 0) lines[index] = tabs + line;
    }
  });

  return lines;
};

const forEachLines = (lines, func) => {
  const linesArr = lines.split(/\n/g);
  linesArr.forEach((line, index) => {
    func(line, index, linesArr);
  });
  return linesArr.join("\n");
};

export default Widget;
