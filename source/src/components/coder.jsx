import React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/theme/monokai.css");
require("codemirror/mode/css/css.js");
require("codemirror/mode/dart/dart.js");

class Coder extends React.Component {
  onChange(editor, data, value) {
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    return (
      <CodeMirror
        className="code-mirror"
        value={this.props.value || ""}
        options={Object.assign(
          {
            theme: "monokai",
            tabSize: 2,
            lineNumbers: true
          },
          this.props.options
        )}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}

export default Coder;
