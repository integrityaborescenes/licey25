import styles from "./MainScreenBody.module.scss";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import MainImageSlider from "../MainImageSlider/MainImageSlider.tsx";
import { socket } from "../../ws.ts";
import { useNavigate } from "react-router";

type Props = {
  isDublicate?: boolean;
};

const MainScreenBody = ({ isDublicate }: Props) => {
  const { data } = useGetMainScreenDataQuery();
  const navigate = useNavigate();
  const handleClick = () => {
    socket.send(
      JSON.stringify({
        type: "click",
      }),
    );
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
      <MainImageSlider isDublicate={isDublicate} />
    </div>
  );
};

export default MainScreenBody;
