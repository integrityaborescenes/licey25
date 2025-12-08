import styles from "./Header.module.scss";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store.ts";
import { setSlide } from "../../store/slices/currentSliderSlice.ts";
import { socket } from "../../ws.ts";

type Props = {
  title: string;
  description?: string;
  backButton?: boolean;
};

const Header = ({ title, description, backButton }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <header>
      <div className={styles.header}>
        {backButton && (
          <div
            className={styles.backButton}
            onClick={() => {
              history.back();
              dispatch(setSlide(0));
              socket.send(
                JSON.stringify({
                  type: "sliderChange",
                  slide: 0,
                  sliderId: "duplicateScreenSlider",
                }),
              );
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
