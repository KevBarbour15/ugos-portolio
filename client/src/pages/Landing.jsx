import React from "react";
import homepage from "../images/homepage.jpg";
import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={styles.maineContainer}>
      <img className={styles.backgroundImage} src={homepage} alt="Landing" />
      <div className={styles.buttonEnter}>
        <Link to="Home">enter</Link>
      </div>
    </div>
  );
};

export default Landing;
