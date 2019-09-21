/////////////////////////////////////////////////////////
//
//	CodeArr
//	[
//   "new Container(" ,
//	 "  child: new Text(" ,
//	 "    "Hello World","
//  ]
//
/////////////////////////////////////////////////////////
import { TAB } from "./template";
import clone from "lodash/clone";

class CodeArr {
    constructor(arr) {
        this.lines = arr || [];
    }

    add(key, code) {
        const index = this.getIndexOf(key);
        if (index > -1) {
            this.lines[index] = code;
        } else {
            this.lines.push(code);
        }
        this.enabled = true;
    }

    isNull() {
        return this.lines.length === 0;
    }

    getIndexOf(key) {
        for (let i = 0; i < this.lines.length; i++) {
            if (this.lines[i].indexOf(`${key}:`) > -1) return i;
        }

        return -1;
    }

    getTabs(n) {
        let tabs = "";
        for (let i = 0; i < n; i++) tabs += TAB;
        return tabs;
    }

    replaceTag(tag, newCode) {
        const cloneLines = clone(this.lines);

        for (let i = 0; i < this.lines.length; i++) {
            const code = this.lines[i];
            if (code.indexOf(tag) > -1) {
                cloneLines.splice(i, 0, newCode);
            }
        }
        this.lines = cloneLines;
    }

    toString(nspace = 0) {
        if(nspace === 0){
            return this.lines.join("\n");
        }else{
            const tabs = this.getTabs(nspace);
            const str = this.lines.join("\n");
            const arr = str.split(/\n/g);
            arr.forEach((line, index) => arr[index] = tabs + line);
            
            return arr.join("\n");
        }
    }
}

export default CodeArr;