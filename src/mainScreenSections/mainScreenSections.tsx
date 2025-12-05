import styles from "./mainScreenSections.module.scss";
import Section from "../components/Section/Section.tsx";

const mainScreenSections = () => {
  return (
    <div className={styles.mainSections}>
      <Section title={"Лицей №25 в годы ВОВ"} />
      <Section title={"357-я стрелковая дивизия"} />
      <Section title={"Историю пишем сами"} />
      <Section title={"Школьный архив"} />
    </div>
  );
};

export default mainScreenSections;
