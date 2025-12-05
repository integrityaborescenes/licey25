import styles from "./Section.module.scss";

type Props = {
  title: string;
};

const Section = ({ title }: Props) => {
  return (
    <div className={styles.section}>
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
