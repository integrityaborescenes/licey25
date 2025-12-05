import "./styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Main from "./pages/Main/Main.tsx";
import MuseumHistory from "./pages/MuseumHistory/MuseumHistory.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/museumHistory" element={<MuseumHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
