import styles from "./SchoolArchiveSections.module.scss";
import { Link } from "react-router";
import Section from "../Section/Section.tsx";
import { useGetArchiveCategoriesQuery } from "../../store/services/archiveCategories.api.ts";
import type { IArchiveCategories } from "../../types/archiveCategories.types.ts";
const SchoolArchiveSections = () => {
  const { data } = useGetArchiveCategoriesQuery();
  return (
    <div className={styles.archiveCategoriesSections}>
      <div className={styles.sectionContainer}>
        {data?.map((info: IArchiveCategories) => (
          <div className={styles.wrap} key={info?.id}>
            <Link to={`/archive/${info?.id}`} state={info}>
              <Section
                title={info?.title}
                block={"archiveCategories"}
              ></Section>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SchoolArchiveSections;
