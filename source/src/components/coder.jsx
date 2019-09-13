import React from "react";
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/monokai.css');
require('codemirror/mode/css/css.js');
require('codemirror/mode/dart/dart.js');

class Coder extends React.Component {

  componentDidMount(){
  }

  render() {
    return (
      <CodeMirror className="code-mirror"
        value={this.props.value}
        options={Object.assign({
          theme: 'material',
          lineNumbers: true
        }, this.props.options)}
        onBeforeChange={(editor, data, value) => {
          this.setState({value});
        }}
        onChange={(editor, value) => {
          console.log('controlled', {value});
        }}
      />
    );
  }
}

export default Coder;
