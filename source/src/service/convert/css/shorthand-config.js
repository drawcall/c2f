const SHORTHAND_RULES = {
  border: {
    "3": ["border-width", "border-style", "border-color"],
    "2": ["border-width", "border-style"],
    "1": ["border-width"]
  },
  "border-radius": {
    "4": [
      "border-top-left-radius",
      "border-top-right-radius",
      "border-bottom-right-radius",
      "border-bottom-left-radius"
    ],
    "2": [
      "border-top-left-radius|border-top-right-radius",
      "border-bottom-right-radius|border-bottom-left-radius"
    ],
    "1": [
      "border-top-left-radius|border-top-right-radius|border-bottom-right-radius|border-bottom-left-radius"
    ]
  },
  padding: {
    "4": ["padding-top", "padding-right", "padding-bottom", "padding-left"],
    "2": ["padding-top|padding-bottom", "padding-left|padding-right"],
    "1": ["padding-top|padding-right|padding-bottom|padding-left"]
  },
  margin: {
    "4": ["margin-top", "margin-right", "margin-bottom", "margin-left"],
    "2": ["margin-top|margin-bottom", "margin-left|margin-right"],
    "1": ["margin-top|margin-right|margin-bottom|margin-left"]
  },
  font: {
    "5": [
      "font-style",
      "font-variant",
      "font-weight",
      "font-size",
      "font-family"
    ],
    "4": ["font-style", "font-weight", "font-size", "font-family"],
    "3": ["font-weight", "font-size", "font-family"]
  },
  "text-decoration": {
    "3": [
      "text-decoration-line",
      "text-decoration-style",
      "text-decoration-color"
    ],
    "2": ["text-decoration-line", "text-decoration-style"],
    "1": ["text-decoration-line"]
  }
};

const EXPANSION_RULES = {
  margin: ["margin-top", "margin-right", "margin-bottom", "margin-left"],
  padding: ["padding-top", "padding-right", "padding-bottom", "padding-left"],
  "border-radius": [
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius"
  ],
  border: ["border-width", "border-style", "border-color"]
};

export { SHORTHAND_RULES, EXPANSION_RULES };
