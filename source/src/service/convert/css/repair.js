import postcss from "postcss";

const rule = {
    "border": ["border-width","border-style","border-color"],
    "font": ["font-style","font-variant" ,"font-weight","font-size"]
}

const repairCss = (result) =>{
    if(!result) return;

    for (let i = 0; i < result.length; i++) {
        const style = result[i];
        if (style.valueList.length > 1) {
            switch(style.key){
                  case "border":
                        break;
            }
        }
    }

    return result;
};

export default repairCss;