import styles from "./ImageToFullScreen.module.scss";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { closeModal } from "../../store/slices/isModalOpenSlice.ts";
import { useContext, useRef, useState } from "react";
import { API_URL } from "../../config.ts";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";

const ImageToFullScreen = () => {
  const image = useSelector((state: RootState) => state.isModalOpen.image);
  const dispatch = useDispatch<AppDispatch>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isDuplicate } = useContext(ScreenModeContext);
  const isVideo = image ? /\.(mp4|webm|ogg)$/i.test(image) : false;
  if (!image) return null;

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className={styles.modal}
      onClick={() => {
        if (!isDuplicate) dispatch(closeModal());
      }}
    >
      <div className="modal-blur"></div>
      <div className={styles.image} onClick={handleContentClick}>
        {!isVideo && <img src={`${API_URL}${image}`} draggable={false} />}
        {isVideo && (
          <>
            {!isPlaying && (
              <div className={styles.startVideo} onClick={handlePlay}>
                <img
                  draggable={false}
                  src="/ico/playButton.svg"
                  width="195"
                  height="220"
                  alt="Play"
                />
              </div>
            )}
            <video
              ref={videoRef}
              src={`${API_URL}${image}`}
              controls={isPlaying}
              draggable={false}
              className={styles.video}
            />
          </>
        )}
        <div
          className={styles.closeWindow}
          onClick={() => {
            if (!isDuplicate) dispatch(closeModal());
          }}
        >
          <img
            src="/ico/closeIco.svg"
            draggable={false}
            width="40"
            height="40"
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal")!,
  );
};

export default ImageToFullScreen;
