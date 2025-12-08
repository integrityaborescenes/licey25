import styles from "./HistoryMainBlock.module.scss";
import { useGetHistoryQuery } from "../../store/services/history.api.ts";
import { Link } from "react-router";
import { useGetPersonDataQuery } from "../../store/services/personData.api.ts";
const API_BASE_URL = "http://licey25.test.itlabs.top";

const HistoryMainBlock = () => {
  const { data } = useGetHistoryQuery();
  const { data: person } = useGetPersonDataQuery();
  const historyText = data?.text;

  return (
    <div className={styles.historyBlock}>
      <div className={styles.photos}>
        <div className={styles.photosContainer}>
          {person?.map((p) => {
            return (
              <>
                <div className={styles.item} key={p.id}>
                  <Link to={`/history/${p.id}`} state={p}>
                    <div className={styles.image}>
                      <img
                        src={`${API_BASE_URL}${p.historyPersonImages[0].file}`}
                      />
                    </div>
                  </Link>
                  <div className={styles.title}>
                    <p>{p.name}</p>
                  </div>
                </div>
              </>
            );
          })}
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
