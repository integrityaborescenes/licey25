import styles from "./MainScreenBody.module.scss";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import MainImageSlider from "../MainImageSlider/MainImageSlider.tsx";
import { useNavigate } from "react-router";

const MainScreenBody = () => {
  const { data } = useGetMainScreenDataQuery();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/museumHistory");
  };

  return (
    <div className={styles.mainScreenBody}>
      <div className={styles.sloganAndDescription}>
        <h2>{data?.slogan}</h2>
        <button onClick={handleClick}>
          <p>Читать описание музея</p>
        </button>
      </div>
      <MainImageSlider />
    </div>
  );
};

export default MainScreenBody;
