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
  const yearMatch = selectedCategory.title.match(/(\d{4})\s*по\s*(\d{4})/);
  const startYear = yearMatch ? parseInt(yearMatch[1], 10) : null;
  const endYear = yearMatch ? parseInt(yearMatch[2], 10) : null;

  const filteredData = data?.filter((item: IArchiveData) => {
    const itemYearMatch = item.title.match(/(\d{4})/);
    const itemYear = itemYearMatch ? parseInt(itemYearMatch[1], 10) : null;
    if (itemYear !== null && startYear !== null && endYear !== null) {
      return itemYear >= startYear && itemYear <= endYear;
    }
    return false;
  });

  return (
    <div className={styles.archiveSelectedCategorySections}>
      <div className={styles.sectionContainer}>
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
