import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import styles from "../styles/Footer.module.scss";

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
      <button onClick={handleLoginClick} className={styles.ownerButton}>
        Owner Login
      </button>
      {showLoginModal && <Login onClose={handleCloseLoginModal} />}
      <div className={styles.contactContainer}>
        <span className={styles.contactLabel}>Contact:</span>{" "}
        <a
          href="https://www.instagram.com/swellysensei/"
          className={styles.item}
        >
          <i className={`fab fa-instagram ${styles.icon}`}></i>
        </a>
        <a href="mailto:swellysensei@gmail.com" className={styles.item}>
          <i className={`fas fa-envelope ${styles.icon}`}></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
