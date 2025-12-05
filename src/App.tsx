import "./styles/index.css";
import Header from "./components/Header/Header.tsx";
import MainScreenBody from "./components/MainScreenBody/MainScreenBody.tsx";
import MainScreenSections from "./mainScreenSections/mainScreenSections.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
  return (
    <>
      <header>
        <Header
          title="Эхо веков"
          description="Исторический музей 25 лингвистического лицея"
        />
      </header>

      <main>
        <MainScreenBody />
        <MainScreenSections />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
