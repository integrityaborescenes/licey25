import styles from "./HistoryMainBlock.module.scss";
import { useGetHistoryQuery } from "../../store/services/history.api.ts";
import { Link } from "react-router";

const HistoryMainBlock = () => {
  const { data } = useGetHistoryQuery();
  const historyText = data?.text;

  return (
    <div className={styles.historyBlock}>
      <div className={styles.photos}>
        <div className={styles.photosContainer}>
          <div className={styles.item}>
            <Link to={`/history/${1}`}>
              <div className={styles.image}>
                <img src="http://licey25.test.itlabs.top//archive/armisheva-tat-yana-viktorovna-v-10-v-klasse-6932e3beade84571826667.webp" />
              </div>
            </Link>
            <div className={styles.title}>
              <p>Корытко Владимир Михайлович</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.historyInfo}>
        <div className={styles.text}>
          <p>{historyText}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryMainBlock;
