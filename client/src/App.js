import React, { Component, useState } from "react";
import { HashRouter, Route, Link } from "react-router-dom";

import "./App.css";

const Menu = React.lazy(() => import("./components/Menu"));
const Product = React.lazy(() => import("./pages/product/Product"));
const Counter = require("./components/Counter");

const App = () => {
  const [string, setString] = useState("");
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => setString("Hello")} />
      <div>{string}</div>
    </div>
  );
};

export default App;
