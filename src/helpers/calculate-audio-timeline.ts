import { HUNDRED_PERCENT } from "@src/const/common.ts";

export const calculateAudioTimelineByClick = (currentTargetLeft: number, currentTargetWidth: number, clientX: number) => {
  const clickCoords = clientX - currentTargetLeft;
  return Math.floor(Math.floor(clickCoords) * HUNDRED_PERCENT / currentTargetWidth);
}

export const calculateAudioTimelineByTimeUpdate = (element: HTMLAudioElement) => {
  const { currentTime, duration } = element;
  return Math.floor((Math.floor(currentTime) * HUNDRED_PERCENT) / Math.floor(duration));
}
