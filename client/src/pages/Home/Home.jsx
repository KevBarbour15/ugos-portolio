import styles from "./Home.module.scss";
import Layout from "../../components/Layout/Layout";
import TitleContainer from "../../components/TitleContainer/TitleContainer";
import img1 from "../../assets/images/sf-orange-2.jpeg";
import img2 from "../../assets/images/sf-orange-3.jpeg";
import img3 from "../../assets/images/sf-orange-1.jpeg";
import img4 from "../../assets/images/sf-orange-4.jpeg";
import img5 from "../../assets/images/sf-orange-5.jpeg";

const Home = () => {
  const images = [img2, img3, img4, img5];

  return (
    <>
      <Layout>
        <div className={styles.homeContainer}>
          <TitleContainer
            title="crimson sky"
            view="view"
            description="san francisco, 2020"
          />
          <div className={styles.homeBanner}>
            <img src={img1}></img>
          </div>
          <div className={styles.imagesContainer}>
            {images.map((image, idx) => {
              let viewIdx = "0" + (idx + 1);
              const isLast = idx === images.length - 1;
              return (
                <div className={`${styles.imageContainer} ${isLast ? styles.noBorderRight : ''}`}>
                  <TitleContainer
                    title="crimson sky"
                    view={"view " + viewIdx}
                    description=""
                  />
                  <div className={styles.imageWrapper}>
                    <img src={image}></img>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
