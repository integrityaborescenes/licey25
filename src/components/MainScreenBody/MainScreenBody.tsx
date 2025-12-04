import styles from "./MainScreenBody.module.scss";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import MainImageSlider from "../mainImageSlider/MainImageSlider.tsx";

const MainScreenBody = () => {
  const { data } = useGetMainScreenDataQuery();

  return (
    <div className={styles.mainScreenBody}>
      <div className={styles.sloganAndDescription}>
        <h2>{data?.slogan}</h2>
        <button>
          <p>Читать описание музея</p>
        </button>
      </div>
      <MainImageSlider />
    </div>
  );
};

export default MainScreenBody;
