import styles from "./ArchivePhotosSection.module.scss";
import { Link } from "react-router";
import Section from "../Section/Section.tsx";
import { useGetArchiveDataQuery } from "../../store/services/archiveData.api.ts";
import type { IArchiveData } from "../../types/archiveData.types.ts";
import type { IArchiveCategories } from "../../types/archiveCategories.types.ts";
import { useMemo, useState } from "react";

type Props = {
  selectedCategory: IArchiveCategories;
};

const ArchivePhotosSection = ({ selectedCategory }: Props) => {
  const { data } = useGetArchiveDataQuery();

  const filteredData = useMemo(() => {
    return (
      data?.filter((d) => d.category.title === selectedCategory.title) || []
    );
  }, [data, selectedCategory.title]);
  const [visibleCount, setVisibleCount] = useState(25);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - (scrollTop + clientHeight) < 500) {
      setVisibleCount((prev) => Math.min(prev + 25, filteredData?.length));
    }
  };

  return (
    <div className={styles.archiveSelectedCategorySections}>
      <div
        className={styles.sectionContainer}
        data-scroll-id={`archiveSelectedCategorySections-${selectedCategory.id}`}
        onScroll={handleScroll}
      >
        {filteredData.slice(0, visibleCount).map((info: IArchiveData) => (
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
