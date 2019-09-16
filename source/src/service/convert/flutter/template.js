const PROP = "<-prop->";
const CLASS = "<-class->";
const CHILD = "<-child->";
const CHILDREN = "<-children->";
const TAB = "<-tab->";
const END = "<-end->";
const REAL_SPACE = "  ";

const CONTAINER = `
new Container( 
  ${CHILDREN}
  ${CHILD}
  ${PROP}
${END}),
`.trim();

const TEXT = `
new Text(
  "Hello World",
  style: new TextStyle(
    ${PROP}
  ),
${END}),
`.trim();

const CENTER = `
new Center(
  ${CHILDREN}
  ${CHILD}
  ${PROP}
${END}),
`.trim();

export {
  CONTAINER,
  TEXT,
  CHILDREN,
  CHILD,
  CLASS,
  PROP,
  CENTER,
  TAB,
  REAL_SPACE,
  END
};
