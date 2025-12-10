import styles from "./ImagesSlider.module.scss";
import { useContext } from "react";
import { openModal } from "../../store/slices/isModalOpenSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { setSlide } from "../../store/slices/currentSliderSlice.ts";
import { socket } from "../../ws.ts";
const API_BASE_URL = "http://licey25.test.itlabs.top/";

type Props = {
  images?: { file: string }[];
};

const ImagesSlider = ({ images }: Props) => {
  const imageList = images ?? [];
  const currentSlide = useSelector(
    (state: RootState) => state.currentSlider.currentSlide,
  );
  const dispatch = useDispatch<AppDispatch>();

  const { isDuplicate } = useContext(ScreenModeContext);

  const handlePrev = () => {
    const newSlide =
      currentSlide !== 0 ? currentSlide - 1 : imageList.length - 1;
    dispatch(setSlide(newSlide));

    socket.send(
      JSON.stringify({
        type: "sliderChange",
        slide: newSlide,
        sliderId: "duplicateScreenSlider",
      }),
    );
  };

  const handleNext = () => {
    const newSlide =
      currentSlide !== imageList.length - 1 ? currentSlide + 1 : 0;
    dispatch(setSlide(newSlide));

    socket.send(
      JSON.stringify({
        type: "sliderChange",
        slide: newSlide,
        sliderId: "duplicateScreenSlider",
      }),
    );
  };

  return (
    <div className={styles.imageSlider}>
      {imageList.length > 1 && !isDuplicate && (
        <>
          <button className={styles.arrowLeft} onClick={handlePrev}>
            <img
              src="/ico/arrowRight.svg"
              draggable={false}
              width="40"
              height="35"
            />
          </button>
          <button className={styles.arrowRight} onClick={handleNext}>
            <img
              src="/ico/arrowRight.svg"
              draggable={false}
              width="40"
              height="35"
            />
          </button>
        </>
      )}
      <div className={styles.imageContainer}>
        <div
          className={styles.slidesWrapper}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {imageList.map((img, i) => (
            <img
              key={i}
              src={`${API_BASE_URL}${img.file}`}
              alt=""
              className={styles.slide}
              onClick={() => {
                dispatch(openModal(img.file));
              }}
            />
          ))}
        </div>
        <img
          className={`${styles.zoomPhoto} ${!isDuplicate ? "" : styles.disabled}`}
          draggable={false}
          src="/ico/zoomIco.svg"
          width="60"
          height="60"
        />
      </div>
    </div>
  );
};

export default ImagesSlider;
