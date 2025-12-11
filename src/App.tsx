import "./styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main.tsx";
import MuseumHistory from "./pages/MuseumHistory/MuseumHistory.tsx";
import Lyceum25WW from "./pages/Lyceum25WW/Lyceum25WW.tsx";
import LyceumSelectedSections from "./pages/LyceumSelectedSections/LyceumSelectedSections.tsx";
import SchoolArchive from "./pages/SchoolArchive/SchoolArchive.tsx";
import ArchiveSelectedCategory from "./pages/ArchiveSelectedCategory/ArchiveSelectedCategory.tsx";
import Photos from "./pages/Photos/Photos.tsx";
import History from "./pages/History/History.tsx";
import Person from "./pages/Person/Person.tsx";
import FireDivison from "./pages/FireDivision/FireDivison.tsx";
import DuplicateScreen from "./pages/DuplicateScreen/DuplicateScreen.tsx";
import { ScreenModeContext } from "./context/ScreenModeContext.ts";
import { Navigate } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/museumHistory" element={<MuseumHistory />} />
        <Route path="/lyceumWW" element={<Lyceum25WW />} />
        <Route path="/lyceumWW/:id" element={<LyceumSelectedSections />} />
        <Route path="/archive" element={<SchoolArchive />} />
        <Route path="/archive/:id" element={<ArchiveSelectedCategory />} />
        <Route path="/archive/:id/:id" element={<Photos />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<Person />} />
        <Route path="/fireDivision" element={<FireDivison />} />
        <Route
          path="/duplicate"
          element={
            <ScreenModeContext.Provider value={{ isDuplicate: true }}>
              <DuplicateScreen />
            </ScreenModeContext.Provider>
          }
        />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
