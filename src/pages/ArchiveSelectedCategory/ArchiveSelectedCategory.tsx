import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import ArchivePhotosSection from "../../components/ArchivePhotosSection/ArchivePhotosSection.tsx";
import type { IArchiveCategories } from "../../types/archiveCategories.types.ts";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import { useSyncedScroll } from "../../hooks/useSyncedScroll.ts";
import WaitMode from "../../components/WaitMode/WaitMode.tsx";

type Props = {
  info?: IArchiveCategories;
};

const ArchiveSelectedCategory = ({ info: propsInfo }: Props) => {
  const location = useLocation();
  const info = propsInfo ?? (location.state as IArchiveCategories);
  const { isDuplicate } = useContext(ScreenModeContext);
  useSyncDuplicate("archiveSelectedCategory", info);
  useSyncedScroll(true);

  return (
    <>
      <header>
        <Header title={info.title} backButton={!isDuplicate} />
      </header>

      <main>
        <ArchivePhotosSection selectedCategory={info} />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
      {!isDuplicate && <WaitMode />}
    </>
  );
};

export default ArchiveSelectedCategory;
