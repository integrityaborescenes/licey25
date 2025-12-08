import Header from "../../components/Header/Header.tsx";
import DescriptionAndPhoto from "../../components/DescriptionAndPhoto/DescriptionAndPhoto.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useGetFireDivisionDataQuery } from "../../store/services/fireDivisionData.api.ts";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";

const FireDivison = () => {
  const { data } = useGetFireDivisionDataQuery();
  const fireData = data?.[0];
  useSyncDuplicate("fireDivision");
  const { isDuplicate } = useContext(ScreenModeContext);

  if (!fireData) return null;

  return (
    <>
      <header>
        <Header title={fireData?.title} backButton={!isDuplicate} />
      </header>

      <main>
        <DescriptionAndPhoto
          description={fireData?.description}
          images={[{ file: fireData?.images[0].imageDivision }]}
        />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default FireDivison;
