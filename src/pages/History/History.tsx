import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import HistoryMainBlock from "../../components/HistoryMainBlock/HistoryMainBlock.tsx";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncedScroll } from "../../hooks/useSyncedScroll.ts";
import WaitMode from "../../components/WaitMode/WaitMode.tsx";

const History = () => {
  useSyncDuplicate("history");
  const { isDuplicate } = useContext(ScreenModeContext);
  useSyncedScroll(true);

  return (
    <>
      <header>
        <Header title="Историю пишем сами" backButton={!isDuplicate} />
      </header>

      <main>
        <HistoryMainBlock />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
      {!isDuplicate && <WaitMode />}
    </>
  );
};

export default History;
