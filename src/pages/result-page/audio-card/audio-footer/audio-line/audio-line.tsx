import { useContext } from "react";

import calculateAudioLineGradient from "@src/helpers/calculate-audio-line-gradient.ts";

import { MusicCardContext, TMusicCardContext } from "@src/const/context.ts";

import style from "./style.module.css";

function AudioLine() {
  const { audioLinePos, timeBarClickHandler } = useContext(MusicCardContext) as TMusicCardContext;

  const audioLineGradient = calculateAudioLineGradient(audioLinePos);

  return (
    <div
      className={`cursor-pointer ${style.audioLineContainer}`}
      onClick={timeBarClickHandler}
    >
      <div
        className={`my-3 ${style.audioLine}`}
        style={{ backgroundImage: audioLineGradient }}
      />
    </div>
  );
}

export default AudioLine;
