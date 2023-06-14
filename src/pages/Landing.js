import React from "react";
import image1 from "../homepage-pics-vertical/image1.jpg";
import "./Landing.css";

function Landing() {
  return (
    <div className="main-container">
      <div className="main-img">
        <img src={image1} alt="Landing" />
      </div>
      <button
        className="btn-enter"
        onClick={() => console.log("Enter button clicked")}
      >
        Enter
      </button>
    </div>
  );
}

export default Landing;
