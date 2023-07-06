import React from "react";
import homepage from "../images/homepage.jpg";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="main-container">
      <img className="background-image" src={homepage} alt="Landing" />
      <div className="btn-enter">
        <Link to="Home">enter</Link>
      </div>
    </div>
  );
};

export default Landing;
