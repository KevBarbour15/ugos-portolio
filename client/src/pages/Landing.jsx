import React from "react";
import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";
import landing from "../videos/landingSmall.mp4";

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <video
        autoPlay
        muted
        loop
        className={styles.landingVideo}
      >
        <source src={landing} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.landingButtonEnter}>
        <Link to="Home" className={styles.landingLink}>
          <span className={styles.landingText}>enter</span>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
