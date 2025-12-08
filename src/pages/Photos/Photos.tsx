import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import SelectedPhotos from "../../components/SelectedPhotos/SelectedPhotos.tsx";
import ImageToFullScreen from "../../components/ImageToFullScreen/ImageToFullScreen.tsx";
import type { RootState } from "../../store/store.ts";
import { useSelector } from "react-redux";
import type { IArchiveData } from "../../types/archiveData.types.ts";
import { useContext, useEffect, useState } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";

type Props = {
  info?: IArchiveData;
};

const Photos = ({ info: propsInfo }: Props) => {
  const location = useLocation();
  const info = propsInfo ?? (location.state as IArchiveData);
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );
  const modalImage = useSelector((state: RootState) => state.isModalOpen.image);
  const { isDuplicate } = useContext(ScreenModeContext);
  const [currentFolder, setCurrentFolder] = useState<IArchiveData>(info);

  useEffect(() => {
    if (info) setCurrentFolder(info);
  }, [info]);

  useSyncDuplicate("archivePhotos", currentFolder, {
    open: isModalOpen,
    image: modalImage,
  });

  return (
    <>
      <header>
        <Header title={currentFolder.title} backButton={!isDuplicate} />
      </header>

      <main>
        <SelectedPhotos
          data={currentFolder}
          navigateBetweenFolders={!isDuplicate}
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
