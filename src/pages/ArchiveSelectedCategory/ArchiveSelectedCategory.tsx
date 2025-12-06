import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import ArchivePhotosSection from "../../components/ArchivePhotosSection/ArchivePhotosSection.tsx";
import type { IArchiveCategories } from "../../types/archiveCategories.types.ts";

const ArchiveSelectedCategory = () => {
  const location = useLocation();
  const info = location.state as IArchiveCategories;

  return (
    <>
      <header>
        <Header title={info.title} backButton={true} />
      </header>

      <main>
        <ArchivePhotosSection selectedCategory={info} />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default ArchiveSelectedCategory;
