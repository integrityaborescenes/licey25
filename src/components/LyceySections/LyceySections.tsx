import styles from "./LyceySections.module.scss";
import { useGetLiceyDataQuery } from "../../store/services/lyceyData.api.ts";
import Section from "../Section/Section.tsx";
import type { ILyceyData } from "../../types/lyceyData.types.ts";
import { useNavigate } from "react-router";
import { socket } from "../../ws.ts";
import { debounce } from "../../utils/debounce.ts";
const LyceySections = () => {
  const { data } = useGetLiceyDataQuery();

  const navigate = useNavigate();
  const handleClick = (info: ILyceyData) => {
    debounce(() => {
      socket.send(
        JSON.stringify({
          type: "/lyceumSelectedSection",
          data: info,
        }),
      );
    });
    navigate(`/lyceumWW/${info.id}`, { state: info });
  };

  return (
    <div className={styles.lyceySections}>
      <div
        className={styles.sectionContainer}
        data-scroll-id={"lyceumSelectedSection"}
      >
        {data?.map((info: ILyceyData) => (
          <div
            className={styles.wrap}
            key={info.id}
            onClick={() => handleClick(info)}
          >
            <Section title={info.title} block="lycey" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default LyceySections;
