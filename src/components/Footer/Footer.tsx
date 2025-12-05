import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
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
