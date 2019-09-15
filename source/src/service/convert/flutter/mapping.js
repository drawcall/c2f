import toFColor from "./transform/color";
import toFunit from "./transform/unit";

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

	return result;
};

export default mapping;