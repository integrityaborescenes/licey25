import styles from "./Section.module.scss";

type Props = {
  title: string;
  block?: string;
};

const Section = ({ title, block }: Props) => {
  return (
    <div
      className={`${styles.section} ${
        block === "lycey"
          ? styles.lyceyBlock
          : block === "archiveCategories"
            ? styles.archiveCategoriesBlock
            : block === "archiveSelected"
              ? styles.archiveSelectedBlock
              : ""
      }`}
    >
      <p>{title}</p>
      <div className={styles.buttonToSection}>
        <div className={styles.link}>
          <img
            src="/public/ico/arrowRight.svg"
            draggable={false}
            width="29"
            height="25"
          />
        </div>
      </div>
    </div>
  );
};
export default Section;
