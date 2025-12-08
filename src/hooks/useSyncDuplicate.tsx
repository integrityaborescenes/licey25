import { socket } from "../ws.ts";
import { useEffect, useRef } from "react";

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
      socket.send(
        JSON.stringify({
          type: "currentScreen",
          screen: data,
        }),
      );
      lastSent.current = json;
    }
  }, [screenName, info, modal]);
};
