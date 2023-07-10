import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import goldBars from "../images/gold-bars.png";
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
      <nav className={styles.header__nav}>
        <ul className={styles.header__navLinks}>
          <div className={styles.header__titleContainer}>
            <div>Ugo Mbakwe</div>
          </div>
          <li className={styles.header__navItem}>
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
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
