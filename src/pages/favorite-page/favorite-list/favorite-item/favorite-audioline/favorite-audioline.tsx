import { MouseEvent, useCallback } from "react";

import { calculateAudioTimelineByClick } from "@src/helpers/calculate-audio-timeline.ts";
import calculateAudioLineGradient from "@src/helpers/calculate-audio-line-gradient.ts";

import { HUNDRED_PERCENT } from "@src/const/common.ts";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>,
  linePosition: number,
  doStateChanges: (draggingFlag?: boolean, newPosition?: number) => void,
  isDragging: boolean,
}

function FavoriteAudioline({ audioRef, linePosition, doStateChanges, isDragging }: Props) {
  const lineGradient = calculateAudioLineGradient(linePosition);

  const getNewLinePosition = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    return calculateAudioTimelineByClick(left, width, e.clientX);
  }, []);

  const onMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      const newLinePosition = getNewLinePosition(e);
      doStateChanges(true, newLinePosition)
    }
  }

  const onMouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newLinePosition = getNewLinePosition(e);
      doStateChanges(undefined, newLinePosition);
    }
  };

  const onMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const current = audioRef.current as HTMLAudioElement;
      const newLinePosition = getNewLinePosition(e);
      current.currentTime = current.duration * newLinePosition / HUNDRED_PERCENT;
      doStateChanges(false, newLinePosition);
    }
  }

  const onMouseLeaveHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newLinePosition = getNewLinePosition(e);
      doStateChanges(false, newLinePosition);
    }
  }

  return (
    <div
      className={`w-10/12 bg-neonPink cursor-grab`}
      style={{ backgroundImage: lineGradient }}
      onMouseDown={onMouseDownHandler}
      onMouseMove={onMouseMoveHandler}
      onMouseUp={onMouseUpHandler}
      onMouseLeave={onMouseLeaveHandler}
    />
  );
}

export default FavoriteAudioline;
