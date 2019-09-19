import React from "react";
import { Row, Col, Button } from "antd";
import Coder from "./coder";
import ResultAlert from "./result-alert";
import Message from "../service/convert/message";
import convert2Flutter from "../service/convert/converter";

class OperatingArea extends React.Component {
  constructor(props) {
    super(props);

    this.cssOptions = {
      mode: "css"
      //theme: 'monokai'
    };

    this.dartOptions = {
      mode: "dart"
    };

    this.cssVal = "";
    this.dartVal = "";
  }

  async componentDidMount() {
    this.cssVal = `
background-color: #e0e0e0;
width: 320px;
height: 240px;
border:5px solid red;
font: 900 24px Georgia;
padding: 2px 10px;
margin: 3px;
border-radius: 10px;
text-decoration: underline wavy red;
    `.trim();

    await this.convertAndUpdateDartCoder();
  }

  clearBtnClickHandler(e) {
    this.updateCoder({ cssVal: "", dartVal: "" });
    Message.success("Cleared successfully");
  }

  async convertBtnClickHandler(e) {
    await this.convertAndUpdateDartCoder();
  }

  codeChangeHadler(value) {
    this.cssVal = value;
  }

  async convertAndUpdateDartCoder() {
    const dartVal = await convert2Flutter(this.cssVal);
    this.updateCoder({ dartVal });
  }

  updateCoder({ cssVal, dartVal }) {
    if (dartVal !== undefined && dartVal !== null) this.dartVal = dartVal;
    if (cssVal !== undefined && cssVal !== null) this.cssVal = cssVal;

    this.setState({});
  }

  render() {
    return (
      <div className="container">
        <ResultAlert />
        <Row>
          <Col span={12} className="coder-con">
            <div className="coder-title">Css</div>
            <Coder
              options={this.cssOptions}
              value={this.cssVal}
              onChange={this.codeChangeHadler.bind(this)}
            />
          </Col>

          <Col span={12} className="coder-con">
            <div className="coder-title">Flutter</div>
            <Coder options={this.dartOptions} value={this.dartVal} />
          </Col>
        </Row>

        <Row className="btns">
          <Button type="danger" onClick={this.clearBtnClickHandler.bind(this)}>
            Clear
          </Button>
          <Button
            type="primary"
            onClick={this.convertBtnClickHandler.bind(this)}
          >
            Convert
          </Button>
        </Row>
      </div>
    );
  }
}

export default OperatingArea;
