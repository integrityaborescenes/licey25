import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import DescriptionAndPhoto from "../../components/DescriptionAndPhoto/DescriptionAndPhoto.tsx";
import type { ILyceyData } from "../../types/lyceyData.types.ts";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";
import { useSyncedScroll } from "../../hooks/useSyncedScroll.ts";
import WaitMode from "../../components/WaitMode/WaitMode.tsx";

type Props = {
  info?: ILyceyData;
};

const LyceumSelectedSections = ({ info: propsInfo }: Props) => {
  const location = useLocation();
  const info = propsInfo ?? (location.state as ILyceyData);
  const { isDuplicate } = useContext(ScreenModeContext);
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );
  const modalImage = useSelector((state: RootState) => state.isModalOpen.image);

  useSyncDuplicate("lyceumSelectedSection", info, {
    open: isModalOpen,
    image: modalImage,
  });
  useSyncedScroll(true);
  return (
    <>
      <header>
        <Header title={info.title} backButton={!isDuplicate} />
      </header>

      <main>
        <DescriptionAndPhoto
          description={info.description}
          images={[{ file: info.images[0].imageLicey }]}
        />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
      {!isDuplicate && <WaitMode />}
    </>
  );
};

export default LyceumSelectedSections;
