import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import type { IArchiveData } from "../../types/archiveData.types.ts";

const Photos = () => {
  const location = useLocation();
  const info = location.state as IArchiveData;

  return (
    <>
      <header>
        <Header title={info.title} />
      </header>

      <main></main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default Photos;
