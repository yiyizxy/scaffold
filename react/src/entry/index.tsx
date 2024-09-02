import React from "react";
import { add } from "../utils/index";
import "./index.less";
import logo from "../assets/images/logo.svg";
import render from '../libs/createRender';

function App() {
  const value = add(4, 5);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{value}</div>
        <h1 className="title"> Webpack V5 + React </h1>
      </header>
    </div>
  );
}

// // Reat18新方法
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

// import Demo from '../containers/index/index';

render(<App />);
