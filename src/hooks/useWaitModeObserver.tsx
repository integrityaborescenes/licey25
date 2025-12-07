import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { startWaitMode, stopWaitMode } from "../store/slices/isWaitModeSlice";
import type { WaitModeType } from "../types/waitMode.types";
import { useGetWaitModeSettingQuery } from "../store/services/waitMode2.api";

const isDateBetween = (now: Date, start: Date, end: Date) => {
  const n = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const s = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  ).getTime();
  const e = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  ).getTime();
  return n >= s && n <= e;
};

const isNowInTimePeriod = (start: Date, end: Date, now: Date) => {
  const nowM = now.getHours() * 60 + now.getMinutes();
  const startM = start.getHours() * 60 + start.getMinutes();
  const endM = end.getHours() * 60 + end.getMinutes();

  if (startM < endM) return nowM >= startM && nowM <= endM;
  return nowM >= startM || nowM <= endM;
};

export const useWaitModeObserver = (apiData: WaitModeType[]) => {
  const dispatch = useDispatch();
  const { data: settings } = useGetWaitModeSettingQuery();
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const getActiveItems = () => {
      const now = new Date();
      return apiData
        .filter((item) => {
          if (!item.timeToShowSettings) return false;
          const startDate = new Date(item.dateForShow);
          const endDate = new Date(item.endDateForShow);
          if (!isDateBetween(now, startDate, endDate)) return false;

          const { timeStart, timeEnd } = item.timeToShowSettings;
          const startT = new Date(timeStart);
          const endT = new Date(timeEnd);

          return isNowInTimePeriod(startT, endT, now);
        })
        .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
    };

    const startIdleTracking = () => {
      const timeout = settings?.timeToWaitMode
        ? settings.timeToWaitMode * 1000
        : 0;

      if (!timeout) return;

      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);

      idleTimerRef.current = window.setTimeout(() => {
        const activeItems = getActiveItems();
        if (activeItems.length > 0) {
          dispatch(startWaitMode(activeItems));
          document.body.classList.add("wait-mode-active");
        }
      }, timeout);
    };

    const handleUserAction = () => {
      dispatch(stopWaitMode());
      document.body.classList.remove("wait-mode-active");
      startIdleTracking();
    };

    const events = ["mousemove", "click", "keydown", "touchmove", "wheel"];
    events.forEach((ev) => window.addEventListener(ev, handleUserAction));

    startIdleTracking();

    const scheduleInterval = window.setInterval(() => {
      const activeItems = getActiveItems();
      if (
        activeItems.length > 0 &&
        !document.body.classList.contains("wait-mode-active")
      ) {
        dispatch(startWaitMode(activeItems));
      }
    }, 30000);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleUserAction));
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      window.clearInterval(scheduleInterval);
    };
  }, [apiData, settings, dispatch]);
};
