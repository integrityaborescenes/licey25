import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import LyceySections from "../../components/LyceySections/LyceySections.tsx";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";

const Lyceum25WW = () => {
  const { isDuplicate } = useContext(ScreenModeContext);
  useSyncDuplicate("lyceumWW");

  return (
    <>
      <header>
        <Header title="Лицей №25 в годы ВОВ" backButton={!isDuplicate} />
      </header>

      <main>
        <LyceySections />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};
export default Lyceum25WW;
