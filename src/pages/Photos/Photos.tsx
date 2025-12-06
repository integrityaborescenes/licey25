import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import SelectedPhotos from "../../components/SelectedPhotos/SelectedPhotos.tsx";
import ImageToFullScreen from "../../components/ImageToFullScreen/ImageToFullScreen.tsx";
import type { RootState } from "../../store/store.ts";
import { useSelector } from "react-redux";
import type { IArchiveData } from "../../types/archiveData.types.ts";
import { useState } from "react";

const Photos = () => {
  const location = useLocation();
  const info = location.state as IArchiveData;
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );

  const [currentFolder, setCurrentFolder] = useState<IArchiveData>(info);

  return (
    <>
      <header>
        <Header title={currentFolder.title} backButton={true} />
      </header>

      <main>
        <SelectedPhotos
          data={currentFolder}
          navigateBetweenFolders={true}
          setCurrentFolder={setCurrentFolder}
        />
        {isModalOpen && <ImageToFullScreen />}
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default Photos;
