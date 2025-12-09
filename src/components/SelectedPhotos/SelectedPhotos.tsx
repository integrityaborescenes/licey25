import styles from "./SelectedPhotos.module.scss";
import type {
  IArchiveData,
  IArchivesImages,
} from "../../types/archiveData.types.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store.ts";
import { openModal } from "../../store/slices/isModalOpenSlice.ts";
import { useGetArchiveDataQuery } from "../../store/services/archiveData.api.ts";
const API_BASE_URL = "http://licey25.test.itlabs.top";

type Props = {
  data: IArchiveData;
  navigateBetweenFolders?: boolean;
  setCurrentFolder?: (folder: IArchiveData) => void;
};

const SelectedPhotos = ({
  data,
  navigateBetweenFolders,
  setCurrentFolder,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: folder } = useGetArchiveDataQuery();
  if (!folder) return null;
  const currentIndex = folder.findIndex((f) => f.id === data.id);

  const prevFolder = () => {
    if (!folder) return;
    const currentIndex = folder.findIndex((f) => f.id === data.id);
    if (setCurrentFolder) setCurrentFolder(folder[currentIndex - 1]);
  };

  const nextFolder = () => {
    if (!folder) return;
    const currentIndex = folder.findIndex((f) => f.id === data.id);
    if (setCurrentFolder) setCurrentFolder(folder[currentIndex + 1]);
  };

  return (
    <div className={styles.block}>
      {navigateBetweenFolders && (
        <div className={styles.navigateBetweenFolders}>
          <button
            className={`${styles.prevFolder} ${currentIndex > 0 ? "" : styles.hidden}`}
            onClick={prevFolder}
          >
            <p>Предыдущая папка</p>
          </button>
          <button
            className={`${styles.nextFolder} ${
              currentIndex < folder.length - 1 ? "" : styles.hidden
            }`}
            onClick={nextFolder}
          >
            <p>Следующая папка</p>
          </button>
        </div>
      )}
      <div className={styles.selectedPhotos}>
        <div
          className={styles.photosContainer}
          data-scroll-id={`photos-${currentIndex}`}
        >
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
    </div>
  );
};

export default SelectedPhotos;
