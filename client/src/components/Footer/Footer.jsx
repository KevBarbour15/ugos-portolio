import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import styles from "./Footer.module.scss";

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
        owner
      </button>
      {showLoginModal && <Login onClose={handleCloseLoginModal} />}
      <div className={styles.contactContainer}>
        <a
          href="https://www.instagram.com/swellysensei/"
          className={styles.footerContact}
        >
          instagram
        </a>
        <a
          href="mailto:swellysensei@gmail.com"
          className={styles.footerContact}
        >
          contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
