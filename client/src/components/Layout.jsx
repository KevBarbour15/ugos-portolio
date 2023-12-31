import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
