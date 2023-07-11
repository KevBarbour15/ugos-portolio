import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import goldBars from "../images/gold-bars.png";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  // revisit sticky bar scroll later
  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.header__titleContainer}>
        <div className={styles.header__First}>Ugo</div>
        <div className={styles.header__Last}>Mbakwe</div>
      </div>
      <div className={styles.header__dropdown}>
        <img
          className={styles.header__dropdownBtn}
          src={goldBars}
          alt="gold-bars"
        />
        <div className={styles.header__dropdownContent}>
          <Link className={styles.header__navLink} to="/home">
            Galleries
          </Link>
          <Link className={styles.header__navLink} to="/about">
            About
          </Link>
          <button
            onClick={handleLoginClick}
            className={styles.header__dropdownButton}
          >
            Owner
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
