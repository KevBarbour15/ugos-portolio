// Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext); // Changed isLoggedIn to isAuthenticated
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <header>
      <nav>
        <ul className="nav-links">
          <h1>Ugo's Portfolio</h1>
          <li></li>
          <li>
            <div className="dropdown">
              <button className="dropbtn">Menu</button>
              <div className="dropdown-content">
                <Link to="/home">Photo Galleries</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <button onClick={handleLoginClick}>User Login</button>
              </div>
            </div>
          </li>
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
