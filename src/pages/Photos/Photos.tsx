import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import type { IArchiveData } from "../../types/archiveData.types.ts";
import SelectedPhotos from "../../components/SelectedPhotos/SelectedPhotos.tsx";
import ImageToFullScreen from "../../components/ImageToFullScreen/ImageToFullScreen.tsx";
import type { RootState } from "../../store/store.ts";
import { useSelector } from "react-redux";

const Photos = () => {
  const location = useLocation();
  const info = location.state as IArchiveData;
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );

  return (
    <>
      <header>
        <Header title={info.title} />
      </header>

      <main>
        <SelectedPhotos data={info} />
        {isModalOpen && <ImageToFullScreen />}
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default Photos;
