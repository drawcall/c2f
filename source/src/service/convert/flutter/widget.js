import { CONTAINER, TEXT, CHILDREN, CHILD, CLASS, PROP, CENTER } from "./template";

class Widget {
	constructor(type){
		this.children = [];
		this.type = type;

		switch(type){
			case "container":
				this.template = CONTAINER;
				break;

			case "text":
				this.template = TEXT;
				break;
		}
	}

	addChild(childWidget){
		this.children.push(childWidget);
	}

	prop(key, val){
		if(!key) return;
		
		const prop = `${key}: ${val},
  ${PROP}`;
		this.template = this.template.replace(PROP, prop);
	}

	assemble(){
		for(let i=0; i<this.children; i++){
			
		}

		return this.normalize(this.template);
	}

	normalize(template){
		return template
			.replace(new RegExp(CHILDREN, "g"), "")
			.replace(new RegExp(CHILD, "g"), "")
			.replace(new RegExp(CLASS, "g"), "")
			.replace(new RegExp(PROP, "g"), "")
			.replace(new RegExp(/  \n/, "ig"), "");
	}

	toString(){
		return this.template;
	}
}

export default Widget;