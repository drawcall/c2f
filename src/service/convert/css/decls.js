import clone from "lodash/clone";

class Decls {
  constructor() {
    this.decls = [];
  }

  add({ key, val, valueList = null, data = null }) {
    this.decls.push({ data, valueList, key, val });
  }

  isNull() {
    return this.decls.length === 0;
  }

  forEach(func) {
    this.decls.forEach((decl, index) => func(decl, index));
  }

  merge(decls) {
    for (let key in decls) {
      this.add({
        key,
        val: decls[key]
      });
    }
  }

  remove(key) {
    for (let i = this.decls.length - 1; i >= 0; i--) {
      if (this.decls[i]["key"] === key) {
        this.decls.splice(i, 1);
      }
    }
  }

  getVal(key, defaultVal) {
    let val = null;
    this.decls.forEach(decl => {
      if (decl.key === key) val = decl.val;
    });

    return val || defaultVal;
  }

  clone() {
    const cloneDecls = new Decls();
    cloneDecls.decls = clone(this.decls);

    return cloneDecls;
  }
}

export default Decls;
