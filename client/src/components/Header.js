import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import goldBars from "../images/gold-bars.png";
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
          <div className="title-container">
            Ugo
            Mbakwe
          </div>
          <li>
            <div className="dropdown">
              <img className="dropbtn" src={goldBars} alt="gold-bars" />
              <div className="dropdown-content">
                <Link to="/home">Galleries</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <button onClick={handleLoginClick} className="dropdown-button">
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
