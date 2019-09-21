const PROP = "<-prop->";
const CLASS = "<-class->";
const CHILDREN = "<-children->";
const DECO = "<-decoration->";
const TAB = "<-tab->";
const REAL_SPACE = "  ";

const CONTAINER = `
new Container( 
  ${CHILDREN}
  ${PROP}
  ${DECO}
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

const POSITIONED = `
new Positioned(
  ${CHILDREN}
  ${PROP}
),`;

const OPACITY = `
new Opacity(
  ${CHILDREN}
  ${PROP}
),`;

export {
  CONTAINER,
  TEXT,
  CHILDREN,
  DECO,
  CLASS,
  PROP,
  CENTER,
  TAB,
  POSITIONED,
  OPACITY,
  REAL_SPACE
};
