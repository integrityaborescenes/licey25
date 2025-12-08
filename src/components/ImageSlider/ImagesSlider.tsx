import styles from "./ImagesSlider.module.scss";
import { useContext, useState } from "react";
import { openModal } from "../../store/slices/isModalOpenSlice.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store.ts";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
const API_BASE_URL = "http://licey25.test.itlabs.top/";

type Props = {
  images?: { file: string }[];
};

const ImagesSlider = ({ images }: Props) => {
  const imageList = images ?? [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { isDuplicate } = useContext(ScreenModeContext);

  return (
    <div className={styles.imageSlider}>
      {imageList.length > 1 && !isDuplicate && (
        <>
          <button
            className={styles.arrowLeft}
            onClick={() =>
              setCurrentSlide((prev) =>
                prev !== 0 ? prev - 1 : imageList.length - 1,
              )
            }
          >
            <img
              src="/public/ico/arrowRight.svg"
              draggable={false}
              width="40"
              height="35"
            />
          </button>
          <button
            className={styles.arrowRight}
            onClick={() => {
              setCurrentSlide((prev) =>
                prev !== imageList.length - 1 ? prev + 1 : 0,
              );
            }}
          >
            <img
              src="/public/ico/arrowRight.svg"
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
