import React from "react";
import { Row, Col, Input, Button } from "antd";
import Converter from "../convert/converter";

const { TextArea } = Input;

class OperatingArea extends React.Component {

  async componentDidMount(){
    const css1 =`
    background-color: #ccffff;
    font-size: 12px;
    `;

    const css2 =`
    .demo{
      background-color: #ccffff;
      font-size: 12px;
    }
    `;

    await Converter.process(css1);
    await Converter.process(css2);
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={12}>
            <TextArea rows={14} />
          </Col>

          <Col span={12}>
            <TextArea rows={14} />
          </Col>
        </Row>

        <Row>
          <Button type="primary">Button</Button>
        </Row>
      </React.Fragment>
    );
  }
}

export default OperatingArea;
