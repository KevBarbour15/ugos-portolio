import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import './fonts/SEA.ttf';
import './fonts/JB.ttf';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
