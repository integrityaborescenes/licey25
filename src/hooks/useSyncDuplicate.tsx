import { useEffect, useRef } from "react";
import { socket } from "../ws.ts";
import { debounce } from "../utils/debounce";

export const useSyncDuplicate = (
  screenName: string,
  info?: any,
  modal?: any,
) => {
  const lastSent = useRef("");
  const sendRef = useRef(
    debounce((data: any) => {
      const json = JSON.stringify(data);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "waitMode", action: "close" }));
        socket.send(JSON.stringify({ type: "currentScreen", screen: data }));
        lastSent.current = json;
      } else {
        socket.addEventListener(
          "open",
          () => {
            socket.send(JSON.stringify({ type: "waitMode", action: "close" }));
            socket.send(
              JSON.stringify({ type: "currentScreen", screen: data }),
            );
            lastSent.current = json;
          },
          { once: true },
        );
      }
    }, 100),
  );

  useEffect(() => {
    const data = { name: screenName, info: info || null, modal: modal || null };
    const json = JSON.stringify(data);

    if (json !== lastSent.current) {
      sendRef.current(data);
    }
  }, [screenName, info, modal]);
};
