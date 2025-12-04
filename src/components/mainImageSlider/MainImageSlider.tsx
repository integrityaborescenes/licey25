import styles from "./MainImageSlider.module.scss";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import { useState } from "react";
const API_BASE_URL = "http://licey25.test.itlabs.top/";
const MainImageSlider = () => {
  const { data } = useGetMainScreenDataQuery();
  const [typeSelector, setTypeSelector] = useState("museum");

  return (
    <>
      <div className={styles.imageSlider}>
        <div className={styles.typeSelector}>
          <button
            onClick={() => setTypeSelector("museum")}
            className={typeSelector === "museum" ? styles.active : ""}
          >
            <p>Музей</p>
          </button>
          <button
            onClick={() => setTypeSelector("licey")}
            className={typeSelector === "licey" ? styles.active : ""}
          >
            <p>Лицей</p>
          </button>
        </div>
        <div className={styles.imageContainer}>
          {
            <img
              src={`${API_BASE_URL}${data?.mainScreenMuseumImages[0].file}`}
              alt=""
            />
          }
        </div>
        <div className={styles.sliderFrameList}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </>
  );
};
export default MainImageSlider;
