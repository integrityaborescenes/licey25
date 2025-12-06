import styles from "./ImageToFullScreen.module.scss";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { closeModal } from "../../store/slices/isModalOpenSlice.ts";
const API_BASE_URL = "http://licey25.test.itlabs.top";

const ImageToFullScreen = () => {
  const image = useSelector((state: RootState) => state.isModalOpen.image);
  if (!image) return null;
  const dispatch = useDispatch<AppDispatch>();

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.image}>
        <img src={`${API_BASE_URL}${image}`} draggable={false} />
        <div
          className={styles.closeWindow}
          onClick={() => {
            dispatch(closeModal());
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
