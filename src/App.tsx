import "./styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main.tsx";
import MuseumHistory from "./pages/MuseumHistory/MuseumHistory.tsx";
import Lyceum25WW from "./pages/Lyceum25WW/Lyceum25WW.tsx";
import LyceumSelectedSections from "./pages/LyceumSelectedSections/LyceumSelectedSections.tsx";
import SchoolArchive from "./pages/SchoolArchive/SchoolArchive.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/museumHistory" element={<MuseumHistory />} />
        <Route path="/lyceumWW" element={<Lyceum25WW />} />
        <Route path="/lyceumWW/:id" element={<LyceumSelectedSections />} />
        <Route path="/archive" element={<SchoolArchive />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
