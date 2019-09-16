import toNumber from "lodash/toNumber";
import toFColor from "./transform/color";
import toFunit from "./transform/unit";
import toCamel from "./transform/camel";
import toFFontWeight from "./transform/fontweight";

const mapping = (key, val)=>{
	let result = { "key":null, "val":null };
	switch(key){
		case "background-color":
			result["key"] = "color";
			result["val"] = toFColor(val);
			break;

		case "width":
		case "height":
			result["key"] = key;
			result["val"] = toFunit(val);
			break;
			
		// case "padding":
		// 	result["key"] = "padding";
		// 	result["val"] = toFColor(val);
		// 	break;
	}

	if(/^font\-[a-zA-Z]+/ig.test(key)){
		result["key"] = toCamel(key);
		if(key=="font-weight"){
			result["val"] = toFFontWeight(val);
		}else if(key=="font-size"){
			result["val"] = toFunit(val);
		}else{
			result["val"] = val;
		} 
	}

	return result;
};

export default mapping;