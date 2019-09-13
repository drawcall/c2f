import React from "react";
import { Row, Col, Button } from "antd";
import Coder from "./coder";
import ResultAlert from "./result-alert";
import Converter from "../service/convert/converter";

class OperatingArea extends React.Component {

  constructor(props) {
      super(props);
      this.state = { cssOptions: {
         mode: 'css',
         //theme: 'monokai'
      }, dartOptions: {
         mode: 'dart',
      }, cssVal: '', dartVal: '' };
  }

  async componentDidMount(){
    this.setState({
      cssVal: `
      background-color: #e0e0e0; /* grey 300 */
      width: 320px;
      height: 240px;
      font: 900 24px Georgia;
    `,
      dartVal:`
    var container = new Container( // grey box
  child: new Text(
    "Hello World",
    style: new TextStyle(
      fontSize: 24.0
      fontWeight: FontWeight.w900,
      fontFamily: "Georgia",
    ),
  ),
  width: 320.0,
  height: 240.0,
  color: Colors.grey[300],
);
    `
    });

    await Converter.process(this.state.cssVal);
  }

  clearBtnClickHandler(){
    this.setState({ cssVal: "", dartVal: "" });
  }

  render() {
    return (
      <div className="container">
        <ResultAlert />
        <Row>
          <Col span={12}>
            <div className="coder-title">Css</div>
            <Coder options={this.state.cssOptions} value={this.state.cssVal} />
          </Col>

          <Col span={12}>
            <div className="coder-title">Flutter</div>
            <Coder options={this.state.dartOptions} value={this.state.dartVal}  />
          </Col>
        </Row>

        <Row className="btns">
          <Button type="danger" onClick={this.clearBtnClickHandler.bind(this)}>Clear</Button>
          <Button type="primary">Convert</Button>
        </Row>
      </div>
    );
  }
}

export default OperatingArea;
