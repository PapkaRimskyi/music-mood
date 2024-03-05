import { MouseEvent, useCallback, useEffect, useRef } from "react";

import { calculateAudioTimelineByClick } from "@src/helpers/calculate-audio-timeline.ts";
import calculateAudioLineGradient from "@src/helpers/calculate-audio-line-gradient.ts";

import { HUNDRED_PERCENT } from "@src/const/common.ts";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>,
  linePosition: number,
  doStateChanges: (draggingFlag?: boolean, newPosition?: number) => void,
  isDragging: boolean,
}

function AudioLine({ audioRef, linePosition, doStateChanges, isDragging }: Props) {
  const lineGradient = calculateAudioLineGradient(linePosition);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      const { current } = lineRef;

      current.addEventListener("touchstart", onTouchStartHandler, { passive: false });
      current.addEventListener("touchmove", onTouchMoveHandler, { passive: false });
      current.addEventListener("touchend", onTouchEndHandler, { passive: false });

      return () => {
        current.removeEventListener("touchstart", onTouchStartHandler);
        current.removeEventListener("touchmove", onTouchMoveHandler);
        current.removeEventListener("touchend", onTouchEndHandler);
      }
    }
  }, [lineRef.current]);

  const getNewLinePosition = useCallback((e: MouseEvent<HTMLDivElement> | TouchEvent) => {
    if ('touches' in e) {
      const { left, width } = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      if (e.type !== 'touchend') {
        return calculateAudioTimelineByClick(left, width, e.touches[0].clientX);
      }
      return calculateAudioTimelineByClick(left, width, e.changedTouches[0].clientX);
    } else {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      return calculateAudioTimelineByClick(left, width, e.clientX);
    }
  }, []);

  const handleLineChanges = (e: MouseEvent<HTMLDivElement> | TouchEvent, draggingFlag?: boolean) => {
    const newLinePosition = getNewLinePosition(e);
    doStateChanges(draggingFlag, newLinePosition);
  }

  const onMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      handleLineChanges(e, true);
    }
  }

  const onMouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleLineChanges(e, undefined);
    }
  };

  const onMouseUpAndLeaveHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDragging) {
      const current = audioRef.current as HTMLAudioElement;
      const newLinePosition = getNewLinePosition(e);
      current.currentTime = current.duration * newLinePosition / HUNDRED_PERCENT;
      doStateChanges(false, newLinePosition);
    }
  }

  const onTouchEndHandler = (e: TouchEvent) => {
    const current = audioRef.current as HTMLAudioElement;
    const newLinePosition = getNewLinePosition(e);
    current.currentTime = current.duration * newLinePosition / HUNDRED_PERCENT;
    doStateChanges(false, newLinePosition);
  }

  const onTouchStartHandler = (e: TouchEvent) => {
    handleLineChanges(e, true);
  };

  const onTouchMoveHandler = (e: TouchEvent) => {
    if (e.touches.length) {
      handleLineChanges(e, undefined);
    }
  }

  return (
    <div
      ref={lineRef}
      className="w-8/12 md:w-10/12 bg-neonPink cursor-pointer"
      style={{ backgroundImage: lineGradient }}
      onMouseDown={onMouseDownHandler}
      onMouseMove={onMouseMoveHandler}
      onMouseUp={onMouseUpAndLeaveHandler}
      onMouseLeave={onMouseUpAndLeaveHandler}
      // onTouchStart={onTouchStartHandler}
      // onTouchMove={onTouchMoveHandler}
      // onTouchEnd={testFunc}
    />
  );
}

export default AudioLine;
