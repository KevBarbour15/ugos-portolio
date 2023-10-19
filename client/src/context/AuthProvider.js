import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("AuthContext.js: useEffect()");
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/auth/validate-token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.valid) {
            console.log("User is authenticated");
            setIsAuthenticated(true);
          }
        } catch (err) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          console.log(err);
        }
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
