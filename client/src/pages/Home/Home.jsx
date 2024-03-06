import styles from "./Home.module.scss";
import Layout from "../../components/Layout/Layout";
import img2 from "../../assets/images/sf-orange-3.jpeg";
import img1 from "../../assets/images/sf-orange-1.jpeg";
import img3 from "../../assets/images/sf-orange-2.jpeg";
import img4 from "../../assets/images/sf-orange-4.jpeg";
import img5 from "../../assets/images/sf-orange-5.jpeg";

const Home = () => {
  return (
    <>
      <Layout>
        <div className={styles.homeContainer}>
          <div className={styles.titleContainer}></div>
          <div className={styles.homeBanner}>
            <img src={img3}></img>
          </div>
          <div className={styles.imagesContainer}>
            <div className={styles.imageContainer}>
              <div className={styles.titleContainer}></div>
              <div className={styles.imageWrapper}>
                <img src={img1}></img>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.titleContainer}></div>
              <div className={styles.imageWrapper}>
                <img src={img2}></img>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.titleContainer}></div>
              <div className={styles.imageWrapper}>
                <img src={img4}></img>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <div className={styles.titleContainer}></div>
              <div className={styles.imageWrapper}>
                <img src={img5}></img>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
