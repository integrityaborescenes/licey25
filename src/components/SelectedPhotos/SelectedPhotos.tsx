import styles from "./SelectedPhotos.module.scss";
import type {
  IArchiveData,
  IArchivesImages,
} from "../../types/archiveData.types.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store.ts";
import { openModal } from "../../store/slices/isModalOpenSlice.ts";
import { useGetArchiveDataQuery } from "../../store/services/archiveData.api.ts";
import { API_URL } from "../../config.ts";

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

  const sameCategoryFolders = folder.filter(
    (f) => f.category.id === data.category.id,
  );

  const currentIndex = sameCategoryFolders.findIndex((f) => f.id === data.id);

  const prevFolder = () => {
    if (currentIndex <= 0) return;
    setCurrentFolder?.(sameCategoryFolders[currentIndex - 1]);
  };

  const nextFolder = () => {
    if (currentIndex >= sameCategoryFolders.length - 1) return;
    setCurrentFolder?.(sameCategoryFolders[currentIndex + 1]);
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
              currentIndex < sameCategoryFolders.length - 1 ? "" : styles.hidden
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
                  dispatch(openModal(item.image || ""));
                }}
              >
                <div className={styles.image}>
                  {item.image !== null ? (
                    <img src={`${API_URL}${item.image}`} alt={item.title} />
                  ) : (
                    ""
                  )}
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
