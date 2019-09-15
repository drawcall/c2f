import Widget from "./widget";
import mapping from "./mapping";

const parseFlutter = (result) =>{
    if (!result||!result.length) return null;

    let container = new Widget("container");
    for(let i = 0; i<result.length; i++) {
        let style = result[i];
        let key = style["key"];
        let val = style["val"];
        let isText = style["isText"];

        if(isText) {
            const text = new Widget("text");
            text.prop(key, val);
            container.addChild(text);
        } else {
            let obj = mapping(key, val);
            container.prop(obj.key, obj.val);
        }
    }

    const flutterStyle = container.assemble();
    return flutterStyle;
};

export default parseFlutter;