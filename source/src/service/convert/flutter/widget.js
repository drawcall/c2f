import ppo from "ppo";
import CodeArr from "./code-arr";
import transform from "./transform";
import {
  CONTAINER,
  TEXT,
  CHILDREN,
  TAB,
  CLASS,
  PROP,
  DECO,
  OPACITY,
  POSITIONED,
  REAL_SPACE
} from "./template";

class Widget {
  constructor(type) {
    this.children = [];
    this.type = type;
    this.decls = null;
    this.parent = null;
    this.id = ppo.uuid();

    switch (type) {
      case "container":
        this.template = CONTAINER;
        break;

      case "position":
        this.template = POSITIONED;
        break;

      case "opacity":
        this.template = OPACITY;
        break;

      case "text":
        this.template = TEXT;
        break;

      default:
        this.template = CONTAINER;
    }

    this.codeString = "";
    this.prop = new CodeArr();
    this.decoration = new CodeArr();
    this.codelines = new CodeArr(this.template.split(/\n/g));
  }

  addChild(child) {
    if (this.children.indexOf(child) < 0) {
      this.children.push(child);
      child.parent = this;
    }
  }

  addChildTo(parent){
    const loop = target => {
      if (!target.parent) {
        parent.addChild(target);
      }else{
        loop(target.parent);
      }
    };

    this.root = parent;
    loop(this);
  }

  getRoot(){
    return this.root || this;
  }

  getDepth() {
    let depth = 0;
    const loop = target => {
      if (target.parent) {
        depth++;
        loop(target.parent);
      }
    };
    loop(this);

    return depth;
  }

  /// set prop --------------------------------
  setProp(okey, oval) {
    let { key, val } = transform(okey, oval, this.decls);
    if (!key) return;

    const code = this.type === "text" ? `    ${key}: ${val},` : `${key}: ${val},`;
    this.prop.add(key, code);
  }

  /// set Decoration --------------------------------
  setDecoration(okey, oval) {
    let { key, val } = transform(okey, oval, this.decls);
    if (!key) return;

    const code = `${key}: ${val},`;
    this.decoration.add(key, code);
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
      if (!line) codeArr.splice(i, 1);
    }

    this.codeString = codeArr.join("\n");
  }

  /// Convert various elements to CodeString ----------------------------
  selfToCodeString() {
    const depth = this.getDepth();
    //const tabs = child.codelines.getTabs(depth);

    this.codeString = this.codelines.toString(depth);
  }

  childToCodeString(child) {
    const childStr = child.toString().trim();
    this.replaceTag(CHILDREN, `  child: ${childStr}`);
  }

  propToCodeString() {
    if (this.prop.isNull()) return;
    this.replaceTag(PROP, this.prop.toString(1));
  }

  decorationToCodeString() {
    if (this.decoration.isNull()) return;

    let decoration = this.decoration.toString(2);
    decoration = `  decoration: BoxDecoration(
${decoration}
  )`;

    this.replaceTag(DECO, decoration);
  }

  replaceTag(TAG, code){
    this.codelines.replaceTag(TAG, code);
  }

  toString() {
    if (this.children.length > 0) {
      if (this.children.length === 1) {
        const child = this.children[0];
        this.childToCodeString(child);
      } else {
        for (let i = 0; i < this.children; i++) { }
      }
    }

    // merge code string
    this.propToCodeString();
    this.decorationToCodeString();
    this.selfToCodeString();
    this.clearAllPseudoTags();
    this.clearBlankLines();

    return this.codeString || "";
  }
}

export default Widget;
