import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import SchoolArchiveSections from "../../components/SchoolArchiveSections/SchoolArchiveSections.tsx";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncedScroll } from "../../hooks/useSyncedScroll.ts";
import WaitMode from "../../components/WaitMode/WaitMode.tsx";

const SchoolArchive = () => {
  useSyncDuplicate("archive");
  const { isDuplicate } = useContext(ScreenModeContext);
  useSyncedScroll(true);
  return (
    <>
      <header>
        <Header title="Школьный архив" backButton={!isDuplicate} />
      </header>

      <main>
        <SchoolArchiveSections />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
      {!isDuplicate && <WaitMode />}
    </>
  );
};

export default SchoolArchive;
