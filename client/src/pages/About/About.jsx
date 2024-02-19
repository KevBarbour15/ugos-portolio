import React from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./About.module.scss";

const About = () => {
  return (
    <div>
      <Layout>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutContent}>
            <p>coming soon</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
