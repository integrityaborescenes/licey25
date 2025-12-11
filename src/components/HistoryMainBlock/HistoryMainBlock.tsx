import styles from "./HistoryMainBlock.module.scss";
import { useGetHistoryQuery } from "../../store/services/history.api.ts";
import { Link } from "react-router";
import { useGetPersonDataQuery } from "../../store/services/personData.api.ts";
import { API_URL } from "../../config.ts";
import { useMemo, useState } from "react";

const HistoryMainBlock = () => {
  const { data } = useGetHistoryQuery();
  const { data: person } = useGetPersonDataQuery();
  const historyText = data?.text;

  const [visibleCount, setVisibleCount] = useState(6);
  const filteredData = useMemo(() => {
    return person?.slice(0, visibleCount) || [];
  }, [person, visibleCount]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - (scrollTop + clientHeight) < 500) {
      setVisibleCount((prev) => Math.min(prev + 6, person?.length || 0));
    }
  };
  return (
    <div className={styles.historyBlock}>
      <div className={styles.photos}>
        <div
          className={styles.photosContainer}
          data-scroll-id={"history"}
          onScroll={handleScroll}
        >
          {filteredData.map((p) => {
            return (
              <div className={styles.item} key={p.id}>
                <Link to={`/history/${p.id}`} state={p}>
                  <div className={styles.image}>
                    {p.historyPersonImages?.[0]?.file && (
                      <img
                        src={`${API_URL}${p.historyPersonImages[0].file}`}
                        alt={p.name}
                        loading="lazy"
                      />
                    )}
                  </div>
                </Link>
                <div className={styles.title}>
                  <p>{p.name}</p>
                </div>
              </div>
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
