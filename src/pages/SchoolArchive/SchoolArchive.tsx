import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import SchoolArchiveSections from "../../components/SchoolArchiveSections/SchoolArchiveSections.tsx";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";

const SchoolArchive = () => {
  useSyncDuplicate("archive");
  const { isDuplicate } = useContext(ScreenModeContext);

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
    </>
  );
};

export default SchoolArchive;
