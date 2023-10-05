import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/About.module.scss";

const About = () => {
  return (
    <div>
      <Layout>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutContent}>
            <p>
              "Zorag namakka shalim dovoltha, karnash brythorn ixal. Quelinth
              jorok althor, vysha kulgrin morandir. Tashmir dalith vyraz, thalor
              gathor kryth. Zandor valkaal mur'gul, jathar ythril marondal.
              Eshara ixim bryshar, shandor vyram kasal. Yrindor valanthal
              vythir, shalondor korash ixen."
            </p>
            <p>
              "Dralok mortha balgara, velmir vyndra kashar. Zyndra jorath
              shalgar, kryndor zythril valkan. Zorin valkar thalor, zandar ixin
              vykesh. Shyrin kalan vyramal, jarkandor xalimar. Fyndar althor
              shalimar, yshalindor korix ixan."
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
