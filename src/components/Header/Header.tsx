import styles from "./Header.module.scss";

type Props = {
  title: string;
  description?: string;
  backButton?: boolean;
};

const Header = ({ title, description, backButton }: Props) => {
  return (
    <header>
      <div className={styles.header}>
        {backButton && (
          <div
            className={styles.backButton}
            onClick={() => {
              history.back();
            }}
          >
            <img
              src="/ico/arrowRight.svg"
              draggable={false}
              width="68"
              height="60"
            />
          </div>
        )}
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
