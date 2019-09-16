import React from "react";
import { Row, Col, Button } from "antd";
import Coder from "./coder";
import ResultAlert from "./result-alert";
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
    `.trim();

    await this.convertAndUpdateDartCoder();
  }

  clearBtnClickHandler(e) {
    this.setState({ cssVal: "", dartVal: "" });
  }

  async convertBtnClickHandler(e) {
    await this.convertAndUpdateDartCoder();
  }

  codeChangeHadler(value) {
    this.cssVal = value;
  }

  async convertAndUpdateDartCoder() {
    const result = await convert2Flutter(this.cssVal);
    this.updateDartCoder(result);
  }

  updateDartCoder(val) {
    this.dartVal = val;
    this.setState({});
  }

  render() {
    return (
      <div className="container">
        <ResultAlert />
        <Row>
          <Col span={12}>
            <div className="coder-title">Css</div>
            <Coder
              options={this.cssOptions}
              value={this.cssVal}
              onChange={this.codeChangeHadler.bind(this)}
            />
          </Col>

          <Col span={12}>
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
