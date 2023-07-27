import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__titleContainer}>
        swellysensai
      </div>
      <nav className={styles.header__nav}>
        <Link className={styles.header__navLink} to="/home">
          Photo
        </Link>
        <Link className={styles.header__navLink} to="/about">
          About
        </Link>
        <button onClick={handleLoginClick} className={styles.header__navButton}>
          Owner
        </button>
      </nav>
    </header>
  );
};

export default Header;
