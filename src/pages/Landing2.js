import React from "react";
import image1 from "../homepage-pics-landscape/image1.jpg";
import "./Landing2.css";

function Landing2() {
  return (
    <div className="main-container">
      <img className="background-image" src={image1} alt="Landing" />
      <button
        className="btn-enter"
        onClick={() => console.log("Enter button clicked")}
      >
        Enter
      </button>
    </div>
  );
}

export default Landing2;
