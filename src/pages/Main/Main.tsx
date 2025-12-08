import Header from "../../components/Header/Header.tsx";
import MainScreenBody from "../../components/MainScreenBody/MainScreenBody.tsx";
import MainScreenSections from "../../components/MainScreenSections/MainScreenSections.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";
import ImageToFullScreen from "../../components/ImageToFullScreen/ImageToFullScreen.tsx";

type Props = {
  isDublicate?: boolean;
};

const Main = ({ isDublicate }: Props) => {
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );
  return (
    <>
      <header>
        <Header
          title="Эхо веков"
          description="Исторический музей 25 лингвистического лицея"
        />
      </header>

      <main>
        <MainScreenBody isDublicate={isDublicate} />
        {isModalOpen && <ImageToFullScreen />}
        <MainScreenSections />
      </main>

      <footer>
        <Footer mainPage={true} />
      </footer>
    </>
  );
};

export default Main;
