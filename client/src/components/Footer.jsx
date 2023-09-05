import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Footer.module.css";

const Footer = () => {
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
    <footer className={styles.footer}>
      <button onClick={handleLoginClick} className={styles.loginButton}>
        owner login
      </button>
      <div className={styles.contactContainer}>
        <span className={styles.contactLabel}>Contact:</span>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a href="https://www.instagram.com/swellysensei/">
              <i className={`fab fa-instagram ${styles.icon}`}></i>
            </a>
          </li>
          <li className={styles.item}>
            <a href="mailto:swellysensei@gmail.com">
              <i className={`fas fa-envelope ${styles.icon}`}></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
