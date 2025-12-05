import styles from "./LyceySections.module.scss";
import { useGetLiceyDataQuery } from "../../store/services/lyceyData.api.ts";
import Section from "../Section/Section.tsx";
import type { ILyceyData } from "../../types/lyceyData.types.ts";
import { Link } from "react-router";
const LyceySections = () => {
  const { data } = useGetLiceyDataQuery();

  return (
    <div className={styles.lyceySections}>
      <div className={styles.sectionContainer}>
        {data?.map((info: ILyceyData) => (
          <div className={styles.wrap} key={info?.id}>
            <Link to={`/lyceumWW/${info?.id}`} state={info}>
              <Section title={info?.title} block={"lycey"}></Section>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LyceySections;
