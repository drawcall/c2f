import React from "react";
import { Layout } from "antd";
import OperatingArea from "./components/operating-area";

import "./App.css";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>Header</Header>
        <Content><OperatingArea/></Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
