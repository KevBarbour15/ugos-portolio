import React, { useState, useContext } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import styles from "./Login.module.scss";

const Login = ({ onClose }) => {
  const username = "ugo";
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Invalid password.");
    }
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <span className="material-icons">close</span>
        </button>
        <form className={styles.formGroup} onSubmit={handleSubmit}>
          <label htmlFor="password" className={styles.formLabel}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className={styles.formField}
            required
          />

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
