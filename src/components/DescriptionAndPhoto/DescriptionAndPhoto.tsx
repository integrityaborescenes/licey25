import styles from "./DescriptionAndPhoto.module.scss";
import ImagesSlider from "../ImageSlider/ImagesSlider.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";
import ImageToFullScreen from "../ImageToFullScreen/ImageToFullScreen.tsx";

type Props = {
  description?: string;
  images?: { file: string }[];
};

const DescriptionAndPhoto = ({ description, images }: Props) => {
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <div className={styles.descriptionCont}>
          {description &&
            description
              .replace(/<\/?div>/g, "")
              .replace(/<br\s*\/?>/gi, "\n")
              .replace(/\r\n|\r|\n/g, "\n")
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, idx) => <p key={idx}>{line}</p>)}
        </div>
      </div>
      {images && images.length > 0 && <ImagesSlider images={images} />}
      {isModalOpen && <ImageToFullScreen />}
    </div>
  );
};

export default DescriptionAndPhoto;
