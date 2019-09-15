
const PROP = "<- prop ->";
const CLASS = "<- class ->";
const CHILD = "<- child ->";
const CHILDREN = "<- children ->";

const CONTAINER = `
new Container( 
  ${CHILDREN}
  ${PROP}
),
`.trim();

const TEXT = `
new Text(
  "Hello World",
  style: new TextStyle(
    ${PROP}
  ),
),
`.trim();

const CENTER = `
new Center(
  child:  ${TEXT},
  ),
`.trim();

export { CONTAINER, TEXT, CHILDREN, CHILD, CLASS, PROP, CENTER };