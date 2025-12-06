import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import LyceySections from "../../components/LyceySections/LyceySections.tsx";

const Lyceum25WW = () => {
  return (
    <>
      <header>
        <Header title="Лицей №25 в годы ВОВ" backButton={true} />
      </header>

      <main>
        <LyceySections />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};
export default Lyceum25WW;
