import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.scss";
import bars from "../images/gold-bars.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerTitleContainer}>swellysensei</div>
      <nav className={styles.headerNav}>
        <Link className={styles.headerNavLink} to="/home">
          photo
        </Link>
        <Link className={styles.headerNavLink} to="/videos">
          video
        </Link>
        <Link className={styles.headerNavLink} to="/about">
          about
        </Link>
      </nav>

      <button
        className={styles.dropdownButton}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img src={bars} alt="dropdown"/>
      </button>
      <div
        className={styles.dropdownContent}
        style={{ display: dropdownOpen ? "flex" : "none" }}
      >
        <Link to="/home" onClick={() => setDropdownOpen(false)}>
          photo
        </Link>
        <Link to="/videos" onClick={() => setDropdownOpen(false)}>
          video
        </Link>
        <Link to="/about" onClick={() => setDropdownOpen(false)}>
          about
        </Link>
      </div>
    </header>
  );
};

export default Header;
