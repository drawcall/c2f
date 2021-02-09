import React from "react";
import { Alert } from "antd";

class ResultAlert extends React.Component {
  render() {
    return (
      <div>
        {false ? (
          <Alert message="Alert Message Text" type="success" banner />
        ) : null}
      </div>
    );
  }
}

export default ResultAlert;
