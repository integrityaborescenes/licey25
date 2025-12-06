import styles from "./MainScreenSections.module.scss";
import Section from "../Section/Section.tsx";
import { Link } from "react-router";

const mainScreenSections = () => {
  return (
    <div className={styles.mainSections}>
      <Link
        to="/lyceumWW"
        style={{ display: "block", width: "100%", textDecoration: "none" }}
      >
        <Section title={"Лицей №25 в годы ВОВ"} />
      </Link>
      <Section title={"357-я стрелковая дивизия"} />
      <Link
        to="/history"
        style={{ display: "block", width: "100%", textDecoration: "none" }}
      >
        <Section title={"Историю пишем сами"} />
      </Link>
      <Link
        to="/archive"
        style={{ display: "block", width: "100%", textDecoration: "none" }}
      >
        <Section title={"Школьный архив"} />
      </Link>
    </div>
  );
};

export default mainScreenSections;
