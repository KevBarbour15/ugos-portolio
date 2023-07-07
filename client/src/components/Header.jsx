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
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <div className={styles.titleContainer}>
            Ugo
            Mbakwe
          </div>
          <li className={styles.navItem}>
            <div className={styles.dropdown}>
              <img className={styles.dropbtn} src={goldBars} alt="gold-bars" />
              <div className={styles.dropdownContent}>
                <Link className={styles.navLink} to="/home">Galleries</Link>
                <Link className={styles.navLink} to="/about">About</Link>
                <button onClick={handleLoginClick} className={styles.dropdownButton}>
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
