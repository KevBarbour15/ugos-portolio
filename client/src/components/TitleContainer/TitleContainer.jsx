import { useRef } from "react";
import styles from "./title-container.module.scss";
import { Link } from "react-router-dom";
import useFadeIn from "../../animations/useFadeIn";

const TitleContainer = ({ title, view, description }) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useFadeIn(true, titleRef, 0.25, 0.75, -20);
  useFadeIn(true, descRef, 0.25, 0.75, 20);

  return (
    <div className={styles.titleContainer}>
      <div ref={titleRef} className={styles.titleInfoWrapper}>
        <span className={styles.title}>{title}</span>
        <Link to="https://swellysensei.onrender.com/photo-collection/65ea095ece2462fa93b3694b">
          <a className={styles.view}>{view}</a>
        </Link>
      </div>
      <div ref={descRef} className={styles.titleDescriptionWrapper}>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default TitleContainer;
