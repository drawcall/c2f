const PROP = "<-prop->";
const PROP2 = "<-prop2->";
const CLASS = "<-class->";
const CHILDREN = "<-children->";
const DECO = "<-decoration->";
const TAB = "<-tab->";
const REAL_SPACE = "  ";

const CONTAINER = `
 Container(
  ${CHILDREN}
  ${PROP}
  ${DECO}
),
`.trim();

const TEXT = `
 Text(
  "Hello World",
  style: TextStyle(
    ${PROP}
  ),
  ${PROP2}
),
`.trim();

const CENTER = `
 Center(
  ${CHILDREN}
  ${PROP}
),
`.trim();

const POSITIONED = `
 Positioned(
  ${CHILDREN}
  ${PROP}
),`;

const OPACITY = `
 Opacity(
  ${CHILDREN}
  ${PROP}
),`;

export { CONTAINER, TEXT, CHILDREN, DECO, CLASS, PROP, PROP2, CENTER, TAB, POSITIONED, OPACITY, REAL_SPACE };
