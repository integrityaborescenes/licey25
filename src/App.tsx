import "./styles/index.css";
import Header from "./components/Header/Header.tsx";
import MainScreenBody from "./components/MainScreenBody/MainScreenBody.tsx";

function App() {
  return (
    <>
      <Header
        title="Эхо веков"
        description="Исторический музей 25 лингвистического лицея"
      />
      <MainScreenBody />
    </>
  );
}

export default App;
