import styles from "./ArchivePhotosSection.module.scss";
import { Link } from "react-router";
import Section from "../Section/Section.tsx";
import { useGetArchiveDataQuery } from "../../store/services/archiveData.api.ts";
import type { IArchiveData } from "../../types/archiveData.types.ts";
import type { IArchiveCategories } from "../../types/archiveCategories.types.ts";

type Props = {
  selectedCategory: IArchiveCategories;
};

const ArchivePhotosSection = ({ selectedCategory }: Props) => {
  const { data } = useGetArchiveDataQuery();

  const filteredData = data?.filter(
    (d) => d.category.title === selectedCategory.title,
  );
  return (
    <div className={styles.archiveSelectedCategorySections}>
      <div
        className={styles.sectionContainer}
        data-scroll-id={`archiveSelectedCategorySections-${selectedCategory.id}`}
      >
        {filteredData?.map((info: IArchiveData) => (
          <div className={styles.wrap} key={info?.id}>
            <Link
              to={`/archive/${selectedCategory?.id}/${info?.id}`}
              state={info}
            >
              <Section title={info?.title} block={"archiveSelected"}></Section>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivePhotosSection;
