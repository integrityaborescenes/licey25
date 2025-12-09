import styles from "./DescriptionAndPhoto.module.scss";
import ImagesSlider from "../ImageSlider/ImagesSlider.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";
import ImageToFullScreen from "../ImageToFullScreen/ImageToFullScreen.tsx";

type Props = {
  description?: string;
  images?: { file: string }[];
  person?: boolean;
  personBio?: string;
};

const DescriptionAndPhoto = ({
  description,
  images,
  person,
  personBio,
}: Props) => {
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {person && personBio !== undefined && (
          <div className={styles.bio}>
            <p>{personBio}</p>
          </div>
        )}
        <div className={styles.description}>
          <div
            className={styles.descriptionCont}
            data-scroll-id={`description-${description?.split("").slice(0, 5).join("")}`}
          >
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
      </div>
      {images && images.length > 0 && <ImagesSlider images={images} />}
      {isModalOpen && <ImageToFullScreen />}
    </div>
  );
};

export default DescriptionAndPhoto;
