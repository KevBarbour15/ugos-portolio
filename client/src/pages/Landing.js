import React from "react";
import image1 from "../homepage-pics-landscape/image1.jpg";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="main-container">
      <img className="background-image" src={image1} alt="Landing" />
      <div className="btn-enter">
        <Link to="Home">enter</Link>
      </div>
    </div>
  );
}

export default Landing;
