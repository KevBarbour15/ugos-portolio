import React from "react";
import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";
import landing from "../videos/landing.mp4";

const Landing = () => {
  return (
    <div className={styles.maineContainer}>
      <video
        autoPlay
        muted
        loop
        className={styles.maineContainer__backgroundVideo}
      >
        <source src={landing} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.maineContainer__buttonEnter}>
        <Link to="Home" className={styles.enterLink}>
          <span className={styles.enterText}>enter</span>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
