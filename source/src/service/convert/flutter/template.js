const PROP = "<-prop->";
const CLASS = "<-class->";
const CHILDREN = "<-children->";
const TAB = "<-tab->";
const REAL_SPACE = "  ";

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
  ${CHILDREN}
  ${PROP}
),
`.trim();

export {
  CONTAINER,
  TEXT,
  CHILDREN,
  CLASS,
  PROP,
  CENTER,
  TAB,
  REAL_SPACE
};
