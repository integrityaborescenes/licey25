import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import DescriptionAndPhoto from "../../components/DescriptionAndPhoto/DescriptionAndPhoto.tsx";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import type { RootState } from "../../store/store.ts";
import { useSelector } from "react-redux";

const MuseumHistory = () => {
  const { data } = useGetMainScreenDataQuery();
  const description = data?.description;
  const images = data?.mainScreenLiceyImages ?? [];
  const { isDuplicate } = useContext(ScreenModeContext);
  const isModalOpen = useSelector(
    (state: RootState) => state.isModalOpen.value,
  );
  const modalImage = useSelector((state: RootState) => state.isModalOpen.image);
  useSyncDuplicate("museumHistory", null, {
    open: isModalOpen,
    image: modalImage,
  });

  useSyncDuplicate("museumHistory");

  return (
    <>
      <header>
        <Header title={"Описание музея"} backButton={!isDuplicate} />
      </header>

      <main>
        <DescriptionAndPhoto description={description} images={images} />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default MuseumHistory;
