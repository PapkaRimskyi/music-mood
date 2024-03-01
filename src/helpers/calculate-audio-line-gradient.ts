import { HUNDRED_PERCENT } from "@src/const/common.ts";

const calculateAudioLineGradient = (audioLinePos: number) =>
  !audioLinePos
    ? `linear-gradient(90deg, #7E30E1 0%, #E26EE5 0%)`
    : `linear-gradient(90deg, #7E30E1 ${audioLinePos}%, #E26EE5 ${audioLinePos !== HUNDRED_PERCENT ? audioLinePos + 1 : HUNDRED_PERCENT}%)`;

export default calculateAudioLineGradient;
