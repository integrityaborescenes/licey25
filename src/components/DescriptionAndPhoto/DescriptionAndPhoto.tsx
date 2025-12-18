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

const renderDescription = (text?: string) => {
  if (!text) return null;

  const normalizedText = text
    .replace(/<\/?div>/g, "")
    .replace(/<br\s*\/?>/gi, "\n");

  const lines = normalizedText.split(/\r\n|\r|\n/);

  return lines.map((line, idx) => {
    if (line.trim() === "") {
      return <p key={idx}>&nbsp;</p>;
    }
    return <p key={idx} dangerouslySetInnerHTML={{ __html: line }} />;
  });
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
            {description && renderDescription(description)}
          </div>
        </div>
      </div>
      {images && images.length > 0 && <ImagesSlider images={images} />}
      {isModalOpen && <ImageToFullScreen />}
    </div>
  );
};

export default DescriptionAndPhoto;
