import styles from "./MainImageSlider.module.scss";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store.ts";
import { openModal } from "../../store/slices/isModalOpenSlice.ts";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
const API_BASE_URL = "http://licey25.test.itlabs.top/";

type Props = {
  sliderState?: { typeSelector: "Museum" | "Licey"; slider: number };
};

const MainImageSlider = ({ sliderState }: Props) => {
  const { data } = useGetMainScreenDataQuery();
  const [typeSelector, setTypeSelector] = useState("Museum");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { isDuplicate } = useContext(ScreenModeContext);

  const images =
    typeSelector === "Museum"
      ? (data?.mainScreenMuseumImages ?? [])
      : (data?.mainScreenLiceyImages ?? []);

  const sliderInfo = useMemo(() => ({ slider: currentSlide }), [currentSlide]);
  useSyncDuplicate(
    "mainSlider",
    { typeSelector, imagesLength: images.length },
    sliderInfo,
  );

  useEffect(() => {
    if (sliderState) {
      if (sliderState.typeSelector !== typeSelector) {
        setTypeSelector(sliderState.typeSelector);
      }
      if (sliderState.slider !== currentSlide) {
        setCurrentSlide(sliderState.slider);
      }
    }
  }, [sliderState, typeSelector, currentSlide]);

  const handleTypeChange = (type: "Museum" | "Licey") => {
    if (type !== typeSelector) {
      setTypeSelector(type);
      setCurrentSlide(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === 0) return;
    const touchEnd = e.touches[0].clientX;
    if (touchStart - touchEnd > 600) {
      setCurrentSlide((prev) =>
        currentSlide !== images.length - 1
          ? Math.min(prev + 1, images?.length - 1)
          : 0,
      );
      setTouchStart(0);
    }
    if (touchStart - touchEnd < -600) {
      setCurrentSlide((prev) =>
        currentSlide !== 0 ? Math.max(prev - 1, 0) : images.length - 1,
      );
      setTouchStart(0);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {images.length > 0 && (
        <div className={styles.imageSlider}>
          <div className={styles.typeSelector}>
            <button
              onClick={() => handleTypeChange("Museum")}
              className={typeSelector === "Museum" ? styles.active : ""}
            >
              <p>Музей</p>
            </button>
            <button
              onClick={() => handleTypeChange("Licey")}
              className={typeSelector === "Licey" ? styles.active : ""}
            >
              <p>Лицей</p>
            </button>
          </div>
          <div
            className={styles.imageContainer}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
          >
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
          {images.length > 1 && (
            <div className={styles.sliderFrameList}>
              {images.map((_, i) => {
                return (
                  <div
                    className={`${styles.circle} ${currentSlide === i ? styles.activeCircle : ""}`}
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                  ></div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default MainImageSlider;
