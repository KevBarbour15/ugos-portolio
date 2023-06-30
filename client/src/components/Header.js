import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

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
    <header>
      <nav>
        <ul className="nav-links">
          <h1>Ugo's Portfolio</h1>
          <li></li>
          <li>
            <div className="dropdown">
              <FontAwesomeIcon
                className="dropbtn"
                icon={faBars}
                onClick={handleLoginClick}
                color="gold"
                size="3x"
              />
              <div className="dropdown-content">
                <Link to="/home">Photo Galleries</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <button onClick={handleLoginClick} className="dropdown-button">
                  Owner Portal
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
