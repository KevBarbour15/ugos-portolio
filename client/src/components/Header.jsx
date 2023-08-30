import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = () => {
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
    </header>
  );
};

export default Header;
