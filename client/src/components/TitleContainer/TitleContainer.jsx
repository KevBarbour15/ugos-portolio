import styles from "./title-container.module.scss";
import { Link } from "react-router-dom";

const TitleContainer = ({ title, view, description }) => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleInfoWrapper}>
        <span className={styles.title}>{title}</span>
        <Link to="https://swellysensei.onrender.com/PhotoCollection/65ea095ece2462fa93b3694b">
          <a className={styles.view}>{view}</a>
        </Link>
      </div>
      <div className={styles.titleDescriptionWrapper}>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default TitleContainer;
