import { useContext, useRef } from "react";

import { HUNDRED_PERCENT } from "@src/const/common.ts";
import { MusicCardContext, TMusicCardContext } from "@src/const/context.ts";

import style from "./style.module.css";

function AudioLine() {
  const { audioLinePos, timeBarClickHandler } = useContext(MusicCardContext) as TMusicCardContext;
  const audioLineRef = useRef<HTMLDivElement>(null);

  const audioLineGradient = !audioLinePos
    ? `linear-gradient(90deg, #7E30E1 0%, #E26EE5 0%)`
    : `linear-gradient(90deg, #7E30E1 ${audioLinePos}%, #E26EE5 ${audioLinePos !== HUNDRED_PERCENT ? audioLinePos + 1 : HUNDRED_PERCENT}%)`

  return (
    <div
      className={`cursor-pointer ${style.audioLineContainer}`}
      onClick={timeBarClickHandler}
    >
      <div
        ref={audioLineRef}
        className={`my-3 ${style.audioLine}`}
        style={{ backgroundImage: audioLineGradient }}
      />
    </div>
  );
}

export default AudioLine;
