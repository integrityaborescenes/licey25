import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import DescriptionAndPhoto from "../../components/DescriptionAndPhoto/DescriptionAndPhoto.tsx";
import type { ILyceyData } from "../../types/lyceyData.types.ts";

const LyceumSelectedSections = () => {
  const location = useLocation();
  const info = location.state as ILyceyData;
  console.log(info);

  return (
    <>
      <header>
        <Header title={info.title} />
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
    </>
  );
};

export default LyceumSelectedSections;
