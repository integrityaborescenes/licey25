import styles from "./DescriptionAndPhoto.module.scss";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";

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
      <div className={styles.photo}>
        <img src="http://licey25.test.itlabs.top/licey/rectangle-14-692ed0ec95076839131914.webp" />
      </div>
    </div>
  );
};

export default DescriptionAndPhoto;
