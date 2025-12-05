import styles from "./SelectedPhotos.module.scss";
import type {
  IArchiveData,
  IArchivesImages,
} from "../../types/archiveData.types.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store.ts";
import { openModal } from "../../store/slices/isModalOpenSlice.ts";
const API_BASE_URL = "http://licey25.test.itlabs.top";

type Props = {
  data: IArchiveData;
};
const SelectedPhotos = ({ data }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className={styles.selectedPhotos}>
      <div className={styles.photosContainer}>
        {data?.archiveImages.map((item: IArchivesImages) => {
          return (
            <div
              className={styles.item}
              key={item.id}
              onClick={() => {
                dispatch(openModal(item.file));
              }}
            >
              <div className={styles.image}>
                <img src={`${API_BASE_URL}${item.file}`} />
              </div>
              <div className={styles.title}>
                <p>{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedPhotos;
