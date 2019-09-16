
const PROP = "<- prop ->";
const CLASS = "<- class ->";
const CHILD = "<- child ->";
const CHILDREN = "<- children ->";
const TAB = "  ";
const END = "<- end ->";

const CONTAINER = `
new Container( 
${TAB}${CHILDREN}
${TAB}${CHILD}
${TAB}${PROP}
${END}),
`.trim();

const TEXT = `
new Text(
${TAB}"Hello World",
${TAB}style: new TextStyle(
${TAB}${TAB}${PROP}
${TAB}),
${END}),
`.trim();

const CENTER = `
new Center(
${TAB}${CHILDREN}
${TAB}${CHILD}
${END}),
`.trim();

export { CONTAINER, TEXT, CHILDREN, CHILD, CLASS, PROP, CENTER, TAB, END };