import { useEffect, useState } from "react";
import { socket } from "../../ws.ts";
import Main from "../Main/Main.tsx";
import MuseumHistory from "../MuseumHistory/MuseumHistory.tsx";

export default function DuplicateScreen() {
  const [screen, setScreen] = useState("main");

  useEffect(() => {
    socket.onmessage = ({ data }) => {
      const event = JSON.parse(data);

      switch (event.type) {
        case "click":
          setScreen("history");
          break;
        default:
          break;
      }
    };
  }, []);

  return (
    <div>
      {screen === "main" && <Main isDublicate={true} />}
      {screen === "history" && <MuseumHistory isDublicate={true} />}
    </div>
  );
}
