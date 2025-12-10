import styles from "./Footer.module.scss";

type Props = {
  mainPage: boolean;
};

const Footer = ({ mainPage }: Props) => {
  let timer: ReturnType<typeof setTimeout>;

  const handleStart = () => {
    timer = setTimeout(() => {
      window.location.href = "http://licey25.test.itlabs.top/admin/login";
    }, 5000);
  };

  const handleEnd = () => {
    clearTimeout(timer);
  };

  return (
    <div className={`${styles.footer} ${mainPage ? styles.mainPage : ""}`}>
      <div className={styles.createdBy}>
        <p>Разработанно в</p>
        <img
          src="/logo/ITLABS_logo_color_blue_2.svg"
          draggable={false}
          width="202"
          height="42"
        />
      </div>
      <div
        className={styles.leave}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
      ></div>
    </div>
  );
};

export default Footer;
