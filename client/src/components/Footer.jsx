import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <footer className={styles.footer}>
      <button onClick={handleLoginClick} className={styles.loginButton}>
        owner login
      </button>
      {showLoginModal && <Login onClose={handleCloseLoginModal} />}
      <div className={styles.contactContainer}>
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
