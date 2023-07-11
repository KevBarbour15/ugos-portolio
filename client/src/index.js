import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import './fonts/SEA.ttf';
import './fonts/JB.ttf';
import './fonts/OstrichSans-Black.otf';
import './fonts/OstrichSans-Bold.otf';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
