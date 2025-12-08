import { socket } from "../ws.ts";
import { useEffect, useRef } from "react";

export const useSyncDuplicate = (screenName: string, data?: any) => {
  const lastSent = useRef<string>("");

  useEffect(() => {
    const current = JSON.stringify({ name: screenName, info: data ?? null });

    if (lastSent.current !== current) {
      socket.send(
        JSON.stringify({
          type: "currentScreen",
          screen: JSON.parse(current),
        }),
      );
      lastSent.current = current;
    }
  }, [screenName, data]);
};
