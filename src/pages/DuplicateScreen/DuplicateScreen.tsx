import { useEffect, useState } from "react";
import type { JSX } from "react";
import { socket } from "../../ws.ts";
import Main from "../Main/Main.tsx";
import MuseumHistory from "../MuseumHistory/MuseumHistory.tsx";
import Lyceum25WW from "../Lyceum25WW/Lyceum25WW.tsx";
import FireDivison from "../FireDivision/FireDivison.tsx";
import History from "../History/History.tsx";
import SchoolArchive from "../SchoolArchive/SchoolArchive.tsx";
import LyceumSelectedSections from "../LyceumSelectedSections/LyceumSelectedSections.tsx";
import Person from "../Person/Person.tsx";
import ArchiveSelectedCategory from "../ArchiveSelectedCategory/ArchiveSelectedCategory.tsx";
import Photos from "../Photos/Photos.tsx";

export default function DuplicateScreen() {
  const [screen, setScreen] = useState<{ name: string; info?: any }>({
    name: "main",
  });

  useEffect(() => {
    socket.onmessage = ({ data }) => {
      const event = JSON.parse(data);

      if (event.type === "currentScreen") {
        setScreen(event.screen);
      }
    };
  }, []);

  const ScreenMap: Record<string, JSX.Element> = {
    main: <Main />,
    museumHistory: <MuseumHistory />,
    lyceumWW: <Lyceum25WW />,
    fireDivision: <FireDivison />,
    history: <History />,
    person: screen.info ? <Person info={screen.info} /> : <Main />,
    archive: <SchoolArchive />,
    archivePhotos: screen.info ? <Photos info={screen.info} /> : <Main />,
    archiveSelectedCategory: screen.info ? (
      <ArchiveSelectedCategory info={screen.info} />
    ) : (
      <Main />
    ),
    lyceumSelectedSection: screen.info ? (
      <LyceumSelectedSections info={screen.info} />
    ) : (
      <Main />
    ),
  };

  return <div>{ScreenMap[screen.name] || <Main />}</div>;
}
