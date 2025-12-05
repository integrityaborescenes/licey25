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
      <Section title={"Историю пишем сами"} />
      <Section title={"Школьный архив"} />
    </div>
  );
};

export default mainScreenSections;
