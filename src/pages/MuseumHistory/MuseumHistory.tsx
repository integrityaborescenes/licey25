import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import DescriptionAndPhoto from "../../components/DescriptionAndPhoto/DescriptionAndPhoto.tsx";
import { useGetMainScreenDataQuery } from "../../store/services/mainScreenData.api.ts";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";

const MuseumHistory = () => {
  const { data } = useGetMainScreenDataQuery();
  const description = data?.description;
  const images = data?.mainScreenLiceyImages ?? [];
  const { isDuplicate } = useContext(ScreenModeContext);
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
