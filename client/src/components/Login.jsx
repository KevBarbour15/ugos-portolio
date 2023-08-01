import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AuthContext from "../context/AuthContext";
import styles from "../styles/Login.module.css";
import Footer from "./Footer";

const Login = () => {
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
      navigate("/dashboard");
    } catch (error) {
      console.log("Failed to login");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.loginContainer}>
        <form className={styles.formGroup} onSubmit={handleSubmit}>     
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="password"
            className={styles.formField}
            required
          />
          <label htmlFor="password" className={styles.formLabel}>owner password</label>

          <button type="submit" className={styles.loginButton}>
          <span>login</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
