import React from "react";
import logo from "../assets/image/logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <div className="title">
        <img alt="" src={logo} width={100} /> Convert css style to flutter style
      </div>
      <div>
        Source code is here
        <a
          style={{ padding: 6 }}
          href="https://github.com/flutterkit/c2f"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://github.com/flutterkit/c2f
        </a>
      </div>
    </div>
  );
};

export default Logo;
