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
        <Link className={styles.headerNavLink} to="/Home">
          photo
        </Link>
        <Link className={styles.headerNavLink} to="/Videos">
          video
        </Link>
        <Link className={styles.headerNavLink} to="/About">
          about
        </Link>
      </nav>

      <button
        className={styles.dropdownButton}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <i className="fa-regular fa-bars" style={{ color: 'white' }}></i>
      </button>
      <div
        className={styles.dropdownContent}
        style={{ display: dropdownOpen ? "flex" : "none" }}
      >
        <Link to="/Home" onClick={() => setDropdownOpen(false)}>
          photo
        </Link>
        <Link to="/Videos" onClick={() => setDropdownOpen(false)}>
          video
        </Link>
        <Link to="/About" onClick={() => setDropdownOpen(false)}>
          about
        </Link>
      </div>
    </header>
  );
};

export default Header;
