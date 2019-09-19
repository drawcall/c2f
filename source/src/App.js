import React from "react";
import { Layout } from "antd";
import Logo from "./components/logo";
import OperatingArea from "./components/operating-area";

import "./App.css";

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Content>
          <Logo />
          <OperatingArea />
          <div id="avator"></div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
