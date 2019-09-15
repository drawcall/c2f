import postcss from "postcss";

const parseCss = (root) =>{
    if (!root) return null;

    return new Promise(function(resolve, reject) {
        const result = [];
        root.walkDecls(decl =>{
            const list = postcss.list.space(decl.value);
            result.push({
                decl,
                valueList: list,
                key: decl.prop,
                val: decl.value
            });
        });

        setTimeout(() =>resolve(result), 80);
    });
};

export default parseCss;