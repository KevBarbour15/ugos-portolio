import styles from "./Home.module.scss";
import Layout from "../../components/Layout/Layout";
import img from "../../images/homepage.jpg";

import defaultLandingVideo from "../../assets/landingSmall.mp4";
import defaultLandingImage from "../../assets/bridge.jpg";

const Home = () => {
  return (
    <div>
      <Layout>
        <div className={styles.homeContainer}>
          <video autoPlay muted loop playsInline>
            <source src={defaultLandingVideo} type="video/mp4" />
          </video>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
