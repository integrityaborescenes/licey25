import { useEffect, useRef } from "react";
import { socket } from "../ws.ts";

export const useSyncDuplicate = (
  screenName: string,
  info?: any,
  modal?: any,
) => {
  const lastSent = useRef("");

  useEffect(() => {
    const data = {
      name: screenName,
      info: info || null,
      modal: modal || null,
    };

    const json = JSON.stringify(data);

    if (json !== lastSent.current) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "waitMode", action: "close" }));
        socket.send(JSON.stringify({ type: "currentScreen", screen: data }));
        lastSent.current = json;
      } else {
        const handleOpen = () => {
          socket.send(JSON.stringify({ type: "waitMode", action: "close" }));
          socket.send(JSON.stringify({ type: "currentScreen", screen: data }));
          lastSent.current = json;
        };
        socket.addEventListener("open", handleOpen, { once: true });
      }
    }
  }, [screenName, info, modal]);
};
