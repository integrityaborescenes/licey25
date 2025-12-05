import styles from "./DescriptionAndPhoto.module.scss";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import ImagesSlider from "../ImageSlider/ImagesSlider.tsx";

const DescriptionAndPhoto = () => {
  const { data } = useGetMainScreenDataQuery();

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        {data?.description
          .replace(/<\/?div>/g, "")
          .split("<br>")
          .map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
      </div>
      <ImagesSlider />
    </div>
  );
};

export default DescriptionAndPhoto;
