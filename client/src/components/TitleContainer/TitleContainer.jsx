import { useRef } from "react";
import styles from "./title-container.module.scss";
import { Link } from "react-router-dom";
import useFadeIn from "../../animations/useFadeIn";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TitleContainer = ({ title, view, description }) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const viewRef = useRef(null);

  //useFadeIn(true, titleRef, 0.25, 0.75, -20);
  //useFadeIn(true, descRef, 0.25, 0.75, 20);

  useGSAP(() => {
    gsap.from(titleRef.current, {
      duration: 0.75,
      delay: 0.25,
      opacity: 0,
      scrambleText: { text: title },
    });

    gsap.from(descRef.current, {
      duration: 0.75,
      delay: 0.25,
      opacity: 0,
      scrambleText: { text: description },
    });

    gsap.from(viewRef.current, {
      duration: 0.75,
      delay: 0.25,
      opacity: 0,
      scrambleText: { text: view },
    });
  });

  return (
    <div className={styles.titleContainer}>
      <div  className={styles.titleInfoWrapper}>
        <span ref={titleRef} className={styles.title}>{title}</span>
        <Link to="https://swellysensei.onrender.com/photo-collection/65ea095ece2462fa93b3694b">
          <a ref={viewRef} className={styles.view}>
            {view}
          </a>
        </Link>
      </div>
      <div ref={descRef} className={styles.titleDescriptionWrapper}>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default TitleContainer;
