import styles from "./title-container.module.scss";

const TitleContainer = ({ title, view, description }) => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.titleInfoWrapper}>
        <span className={styles.title}>{title}</span>
        <span className={styles.view}>{view}</span>
      </div>
      <div className={styles.titleDescriptionWrapper}>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default TitleContainer;
