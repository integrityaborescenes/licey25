import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import HistoryMainBlock from "../../components/HistoryMainBlock/HistoryMainBlock.tsx";

const History = () => {
  return (
    <>
      <header>
        <Header title="Историю пишем сами" backButton={true} />
      </header>

      <main>
        <HistoryMainBlock />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default History;
