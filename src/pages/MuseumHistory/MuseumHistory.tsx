import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import DescriptionAndPhoto from "../../components/DescriptionAndPhoto/DescriptionAndPhoto.tsx";

const MuseumHistory = () => {
  return (
    <>
      <header>
        <Header title={"Описание музея"} />
      </header>

      <main>
        <DescriptionAndPhoto />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default MuseumHistory;
