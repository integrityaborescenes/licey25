import styles from "./Header.module.scss";

type Props = {
  title: string;
  description?: string;
};

const Header = ({ title, description }: Props) => {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <p>{title}</p>
          {description && <span>{description}</span>}
        </div>
        <div className={styles.headerLogos}>
          <div className={styles.scoolLogo1}>
            <img
              src="/public/logo/schoolHeaderLogo1.svg"
              draggable={false}
              width="153"
              height="153"
            />
          </div>
          <div className={styles.scoolLogo2}>
            <img
              src="/public/logo/schoolHeaderLogo2.svg"
              draggable={false}
              width="125"
              height="126"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
