import styles from "./SchoolArchiveSections.module.scss";
import type { ILyceyData } from "../../types/lyceyData.types.ts";
import { Link } from "react-router";
import Section from "../Section/Section.tsx";
import { useGetLiceyDataQuery } from "../../store/services/lyceyData.api.ts";

const SchoolArchiveSections = () => {
  const { data } = useGetLiceyDataQuery();

  return (
    <div className={styles.lyceySections}>
      <div className={styles.sectionContainer}>
        {data?.map((info: ILyceyData) => (
          <div className={styles.wrap} key={info?.id}>
            <Link to={`/lyceumWW/${info?.id}`} state={info}>
              <Section title={info?.title} block={"archive"}></Section>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SchoolArchiveSections;
