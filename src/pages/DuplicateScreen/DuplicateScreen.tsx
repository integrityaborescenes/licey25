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
import { openModal, closeModal } from "../../store/slices/isModalOpenSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { setSlide } from "../../store/slices/currentSliderSlice.ts";
import { useSyncedScroll } from "../../hooks/useSyncedScroll.ts";
import {
  startWaitMode,
  stopWaitMode,
} from "../../store/slices/isWaitModeSlice.ts";
import WaitMode from "../../components/WaitMode/WaitMode.tsx";
import type { RootState } from "../../store/store.ts";

export default function DuplicateScreen() {
  const [screen, setScreen] = useState({
    name: "main",
    info: null,
    modal: null,
  });
  const [sliderState, setSliderState] = useState<{
    typeSelector: "Museum" | "Licey";
    slider: number;
  }>({
    typeSelector: "Museum",
    slider: 0,
  });

  const dispatch = useDispatch();
  const isActive = useSelector((state: RootState) => state.isWaitMode.isActive);

  useSyncedScroll(false);
  useEffect(() => {
    const handler = (eventMessage: MessageEvent) => {
      const event = JSON.parse(eventMessage.data);

      if (event.type === "currentScreen") {
        setScreen(event.screen);

        if (event.screen.modal?.open) {
          dispatch(openModal(event.screen.modal.image));
        } else {
          dispatch(closeModal());
        }

        if (event.screen.name === "mainSlider") {
          const type =
            event.screen.info?.typeSelector === "Licey" ? "Licey" : "Museum";
          setSliderState({
            typeSelector: type,
            slider: event.screen.modal?.slider ?? 0,
          });
        }
      }

      if (event.type === "waitMode") {
        if (event.action === "open") dispatch(startWaitMode(event.files));
        if (event.action === "close") dispatch(stopWaitMode());
      }

      if (
        event.type === "sliderChange" &&
        event.sliderId === "duplicateScreenSlider"
      ) {
        dispatch(setSlide(event.slide));
      }
    };

    socket.addEventListener("message", handler);

    return () => {
      socket.removeEventListener("message", handler);
    };
  }, [dispatch]);

  const ScreenMap: Record<string, JSX.Element> = {
    main: <Main sliderState={sliderState} />,
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

  return (
    <div style={{ pointerEvents: "none" }}>
      {ScreenMap[screen.name] || <Main sliderState={sliderState} />}
      {isActive && <WaitMode isDuplicate={true} />}
    </div>
  );
}
