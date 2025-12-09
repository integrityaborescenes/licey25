import Header from "../../components/Header/Header.tsx";
import MainScreenBody from "../../components/MainScreenBody/MainScreenBody.tsx";
import MainScreenSections from "../../components/MainScreenSections/MainScreenSections.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";
import ImageToFullScreen from "../../components/ImageToFullScreen/ImageToFullScreen.tsx";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import WaitMode from "../../components/WaitMode/WaitMode.tsx";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";

type Props = {
  sliderState?: { typeSelector: "Museum" | "Licey"; slider: number };
};

const Main = ({ sliderState }: Props) => {
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );
  const modalImage = useSelector((state: RootState) => state.isModalOpen.image);

  useSyncDuplicate("main", null, { open: isModalOpen, image: modalImage });
  const { isDuplicate } = useContext(ScreenModeContext);

  return (
    <>
      <header>
        <Header
          title="Эхо веков"
          description="Исторический музей 25 лингвистического лицея"
        />
      </header>

      <main>
        <MainScreenBody sliderState={sliderState} />
        {isModalOpen && <ImageToFullScreen />}
        <MainScreenSections />
      </main>

      <footer>
        <Footer mainPage={true} />
      </footer>

      {!isDuplicate && <WaitMode />}
    </>
  );
};

export default Main;
