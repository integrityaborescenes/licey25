import { useEffect } from "react";
import { socket } from "../ws.ts";

export function useSyncedScroll(isMaster: boolean = true) {
  useEffect(() => {
    if (isMaster) {
      const scrollableElements =
        document.querySelectorAll<HTMLElement>("[data-scroll-id]");

      const handleScroll = (el: HTMLElement) => {
        const scrollId = el.dataset.scrollId;
        if (!scrollId) return;

        const max = el.scrollHeight - el.clientHeight;
        if (max <= 0) return;

        const percent = el.scrollTop / max;
        socket.send(JSON.stringify({ type: "scroll", scrollId, percent }));
      };

      scrollableElements.forEach((el) =>
        el.addEventListener("scroll", () => handleScroll(el)),
      );

      return () => {
        scrollableElements.forEach((el) =>
          el.removeEventListener("scroll", () => handleScroll(el)),
        );
      };
    } else {
      const handler = (eventMessage: MessageEvent) => {
        const event = JSON.parse(eventMessage.data);
        if (event.type !== "scroll") return;

        const el = document.querySelector<HTMLElement>(
          `[data-scroll-id="${event.scrollId}"]`,
        );
        if (!el) return;

        const max = el.scrollHeight - el.clientHeight;
        el.scrollTop = event.percent * max;
      };

      socket.addEventListener("message", handler);

      return () => {
        socket.removeEventListener("message", handler);
      };
    }
  }, [isMaster]);
}
