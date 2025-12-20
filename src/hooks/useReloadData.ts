import { useGetMainScreenDataQuery } from "../store/services/mainScreenData.api.ts";
import { useGetLiceyDataQuery } from "../store/services/lyceyData.api.ts";
import { useGetArchiveDataQuery } from "../store/services/archiveData.api.ts";
import { useGetArchiveCategoriesQuery } from "../store/services/archiveCategories.api.ts";
import { useGetPersonDataQuery } from "../store/services/personData.api.ts";
import { useGetHistoryQuery } from "../store/services/history.api.ts";
import { useGetFireDivisionDataQuery } from "../store/services/fireDivisionData.api.ts";
import { useGetWaitModeDataQuery } from "../store/services/waitMode.api.ts";
import { useGetWaitModeSettingQuery } from "../store/services/waitMode2.api.ts";

export const useReloadData = () => {
  const { refetch: refetchMain } = useGetMainScreenDataQuery();
  const { refetch: refetchLicey } = useGetLiceyDataQuery();
  const { refetch: refetchArchive } = useGetArchiveDataQuery();
  const { refetch: refetchArchiveCategories } = useGetArchiveCategoriesQuery();
  const { refetch: refetchPerson } = useGetPersonDataQuery();
  const { refetch: refetchHistory } = useGetHistoryQuery();
  const { refetch: refetchFire } = useGetFireDivisionDataQuery();
  const { refetch: refetchWait1 } = useGetWaitModeDataQuery();
  const { refetch: refetchWait2 } = useGetWaitModeSettingQuery();

  return {
    refetchMain,
    refetchLicey,
    refetchArchive,
    refetchArchiveCategories,
    refetchPerson,
    refetchHistory,
    refetchFire,
    refetchWait1,
    refetchWait2,
  };
};
