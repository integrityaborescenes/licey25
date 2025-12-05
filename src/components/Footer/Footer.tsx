import styles from "./Footer.module.scss";

type Props = {
  mainPage: boolean;
};

const Footer = ({ mainPage }: Props) => {
  return (
    <div className={`${styles.footer} ${mainPage ? styles.mainPage : ""}`}>
      <div className={styles.createdBy}>
        <p>Разработанно в</p>
        <img
          src="/public/logo/ITLABS_logo_color_blue_2.svg"
          draggable={false}
          width="202"
          height="42"
        />
      </div>
    </div>
  );
};

export default Footer;
