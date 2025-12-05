import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import SchoolArchiveSections from "../../components/SchoolArchiveSections/SchoolArchiveSections.tsx";

const SchoolArchive = () => {
  return (
    <>
      <header>
        <Header title="Школьный архив" />
      </header>

      <main>
        <SchoolArchiveSections />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default SchoolArchive;
