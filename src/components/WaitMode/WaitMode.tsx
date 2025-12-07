import { createPortal } from "react-dom";
import styles from "./WaitMode.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { stopWaitMode } from "../../store/slices/isWaitModeSlice";
import { useEffect, useState, useRef } from "react";
import type { RootState } from "../../store/store";
import { useGetWaitModeSettingQuery } from "../../store/services/waitMode2.api";

const API_BASE_URL = "http://licey25.test.itlabs.top";

const DEFAULT_IMAGE_DURATION = 7000;
const DEFAULT_VIDEO_DURATION = 0;

const WaitMode = () => {
  const { data } = useSelector((state: RootState) => state.isWaitMode);
  const dispatch = useDispatch();

  const [idx, setIdx] = useState(0);

  const { data: settings } = useGetWaitModeSettingQuery();

  const timerRef = useRef<number | null>(null);

  const current = data[idx];
  if (!current) return null;

  const isVideo = Boolean(current.vichFile?.trim());

  const getDisplayDuration = () => {
    const adminImageDuration = settings?.imageShowTime
      ? settings.imageShowTime * 1000
      : DEFAULT_IMAGE_DURATION;

    if (isVideo) return DEFAULT_VIDEO_DURATION;

    return adminImageDuration;
  };

  const goNext = () => {
    setIdx((prev) => {
      if (prev + 1 < data.length) return prev + 1;
      return 0;
    });
  };

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    if (!isVideo) {
      const duration = getDisplayDuration();
      timerRef.current = window.setTimeout(goNext, duration);
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [idx, isVideo, data, settings]);

  const handleVideoEnd = () => {
    goNext();
  };

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.image}>
        {!isVideo && (
          <img
            src={`${API_BASE_URL}${current.file}`}
            draggable={false}
            alt=""
          />
        )}

        {isVideo && (
          <video
            src={`${API_BASE_URL}${current.vichFile}`}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className={styles.video}
            draggable={false}
          />
        )}

        <div
          className={styles.closeWindow}
          onClick={() => dispatch(stopWaitMode())}
        >
          <img
            src="/ico/closeIco.svg"
            width="40"
            height="40"
            draggable={false}
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal")!,
  );
};

export default WaitMode;
