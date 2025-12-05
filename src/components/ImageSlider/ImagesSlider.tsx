import styles from "./ImagesSlider.module.scss";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import { useState } from "react";
const API_BASE_URL = "http://licey25.test.itlabs.top/";

const ImagesSlider = () => {
  const { data } = useGetMainScreenDataQuery();
  const images = data?.mainScreenLiceyImages ?? [];
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className={styles.imageSlider}>
      <button
        className={styles.arrowLeft}
        onClick={() =>
          setCurrentSlide((prev) =>
            currentSlide !== 0 ? prev - 1 : images.length - 1,
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
            currentSlide !== images.length - 1 ? prev + 1 : 0,
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
      <div className={styles.imageContainer}>
        <div
          className={styles.slidesWrapper}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={`${API_BASE_URL}${img.file}`}
              alt=""
              className={styles.slide}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesSlider;
