import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router basename="/ugos-portfolio">
    <p>Hello, this is a test in the index!</p>
    <App />
  </Router>,
  document.getElementById("root")
);
