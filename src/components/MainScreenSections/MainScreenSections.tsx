import styles from "./MainScreenSections.module.scss";
import Section from "../Section/Section.tsx";
import { useNavigate } from "react-router";
import { socket } from "../../ws.ts";
import { debounce } from "../../utils/debounce.ts";

const mainScreenSections = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    debounce(() => {
      socket.send(
        JSON.stringify({
          type: `${path}`,
          path,
        }),
      );
    });
    navigate(path);
  };

  return (
    <div className={styles.mainSections}>
      <div
        onClick={() => handleClick("/lyceumWW")}
        style={{ display: "block", width: "100%", textDecoration: "none" }}
      >
        <Section title={"Лицей №25 в годы ВОВ"} />
      </div>
      <div
        onClick={() => handleClick("/fireDivision")}
        style={{ display: "block", width: "100%", textDecoration: "none" }}
      >
        <Section title={"357-я стрелковая дивизия"} />
      </div>
      <div
        onClick={() => handleClick("/history")}
        style={{ display: "block", width: "100%", textDecoration: "none" }}
      >
        <Section title={"Историю пишем сами"} />
      </div>
      <div
        onClick={() => handleClick("/archive")}
        style={{ display: "block", width: "100%", textDecoration: "none" }}
      >
        <Section title={"Школьный архив"} />
      </div>
    </div>
  );
};

export default mainScreenSections;
