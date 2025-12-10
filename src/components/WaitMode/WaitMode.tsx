import { useEffect, useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  startWaitMode,
  stopWaitMode,
} from "../../store/slices/isWaitModeSlice";
import { useGetWaitModeDataQuery } from "../../store/services/waitMode.api";
import { useGetWaitModeSettingQuery } from "../../store/services/waitMode2.api";
import styles from "./WaitMode.module.scss";
import type { WaitModeType } from "../../types/waitMode.types";
import type { RootState } from "../../store/store.ts";
import { socket } from "../../ws.ts";
import { API_URL } from "../../config.ts";

type Props = {
  isDuplicate?: boolean;
};

const WaitMode = ({ isDuplicate }: Props) => {
  const dispatch = useDispatch();

  const { data: filesRaw = [], isLoading: filesLoading } =
    useGetWaitModeDataQuery();
  const { data: settings, isLoading: settingsLoading } =
    useGetWaitModeSettingQuery();

  const { isActive } = useSelector((state: RootState) => state.isWaitMode);
  const [currentIndex, setCurrentIndex] = useState(0);

  const files = useMemo(
    () => [...filesRaw].sort((a, b) => a.sequence - b.sequence),
    [filesRaw],
  );

  const current: WaitModeType | undefined = files[currentIndex];
  const isVideo = current?.file.match(/\.(mp4|webm|mov|avi)$/i);

  const resetAfkTimer = useCallback(() => {
    clearTimeout((window as any).afkTimer);

    if (isActive) return;

    (window as any).afkTimer = window.setTimeout(
      () => {
        if (files.length > 0) {
          dispatch(startWaitMode(files));
          socket.send(
            JSON.stringify({
              type: "waitMode",
              action: "open",
              files,
            }),
          );

          setCurrentIndex(0);
        }
      },
      settings?.timeToWaitMode ? settings.timeToWaitMode * 1000 : 10000,
    );
  }, [dispatch, files, settings?.timeToWaitMode, isActive]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetAfkTimer));
    resetAfkTimer();
    return () =>
      events.forEach((e) => window.removeEventListener(e, resetAfkTimer));
  }, [resetAfkTimer]);

  useEffect(() => {
    if (!isActive || !current || isVideo) return;

    const timer = window.setTimeout(
      () => {
        setCurrentIndex((prev) => (prev + 1) % files.length);
      },
      settings?.imageShowTime ? settings.imageShowTime * 1000 : 3000,
    );

    return () => window.clearTimeout(timer);
  }, [current, isActive, files, isVideo, settings?.imageShowTime]);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % files.length);
  };

  if (
    filesLoading ||
    settingsLoading ||
    !settings ||
    files.length === 0 ||
    !isActive
  )
    return null;

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      className={styles.modal}
      onClick={() => {
        if (!isDuplicate) {
          dispatch(stopWaitMode());

          socket.send(
            JSON.stringify({
              type: "waitMode",
              action: "close",
            }),
          );
        }
      }}
    >
      <div className={styles.image} onClick={handleContentClick}>
        {!isVideo && (
          <img src={`${API_URL}${current.file}`} alt="" draggable={false} />
        )}
        {isVideo && (
          <video
            src={`${API_URL}${current.file}`}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className={styles.video}
            draggable={false}
          />
        )}

        <div
          className={styles.closeWindow}
          onClick={() => {
            if (!isDuplicate) {
              dispatch(stopWaitMode());
              socket.send(
                JSON.stringify({
                  type: "waitMode",
                  action: "close",
                }),
              );
            }
          }}
        >
          <img
            src="/ico/closeIco.svg"
            width="40"
            height="40"
            draggable={false}
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal")!,
  );
};

export default WaitMode;
