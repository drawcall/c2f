const SPLIT_MAPPING = {
  background: [
    "background-color",
    "background-image",
    "background-position",
    "background-size",
    "background-repeat"
  ],

  "border-radius": [
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius"
  ],

  "text-decoration": [
    "text-decoration-line",
    "text-decoration-style",
    "text-decoration-color"
  ],

  border: ["border-width", "border-style", "border-color"],

  padding: ["padding-top", "padding-right", "padding-bottom", "padding-left"],

  margin: ["margin-top", "margin-right", "margin-bottom", "margin-left"],

  font: [
    "font-style",
    "font-weight",
    "font-size",
    "font-family"
  ]
};

export default SPLIT_MAPPING;
