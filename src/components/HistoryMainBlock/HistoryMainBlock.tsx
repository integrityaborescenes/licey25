import styles from "./HistoryMainBlock.module.scss";

const HistoryMainBlock = () => {
  return (
    <div className={styles.historyBlock}>
      <div className={styles.photos}>
        <div className={styles.photosContainer}></div>
      </div>
      <div className={styles.historyInfo}></div>
    </div>
  );
};

export default HistoryMainBlock;
