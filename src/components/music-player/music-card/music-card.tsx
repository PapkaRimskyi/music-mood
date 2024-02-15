import { MouseEvent, SyntheticEvent, useRef, useState } from "react";

import Header from "./header/header.tsx";
import Footer from "./footer/footer.tsx";

import { DEFAULT_AUDIO_STATE, HUNDRED_PERCENT } from "../../../const/common.ts";

import { ISearch } from "../../../api/interfaces.ts";

import style from './style.module.css';

type Props = {
  data: ISearch;
}

function MusicCard({ data }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentAudioState, setCurrentAudioState] = useState(DEFAULT_AUDIO_STATE);
  const [audioLinePos, setAudioLinePos] = useState(0);

  const playHandle = () => {
    if (audioRef.current) {
      const audioElem = audioRef.current;
      !audioElem.paused ? audioElem.pause() : audioElem.play();
      updateCurrentAudioState(audioElem.currentTime, undefined, !audioElem.paused);
    }
  }

  const updateAudioLinePos = (element: HTMLAudioElement) => {
    const { currentTime, duration } = element;
    const currentSongPercent = Math.floor((Math.floor(currentTime) * HUNDRED_PERCENT) / Math.floor(duration));
    setAudioLinePos(currentSongPercent);
  }

  const updateCurrentAudioState = (currentTime: number, duration?: number, playState?: boolean) =>
    setCurrentAudioState((prevState) => ({ currentTime, duration: duration || prevState.duration, playState: playState || prevState.playState }));

  const onTimeUpdateAudioHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const { currentTarget } = e;
    updateCurrentAudioState(currentTarget.currentTime);
    updateAudioLinePos(currentTarget);
  }

  const timeBarClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const { duration } = currentAudioState;
    const clickCoords = e.clientX - left;
    const newAudioLineGradientPercent = Math.floor(Math.floor(clickCoords) * HUNDRED_PERCENT / width);
    (audioRef.current as HTMLAudioElement).currentTime = duration * newAudioLineGradientPercent / HUNDRED_PERCENT;
    setAudioLinePos(newAudioLineGradientPercent);
  }

  return (
    <div className={`mx-auto rounded-lg ${style.container}`} style={{ backgroundImage: `url(${data.album.cover_xl})` }} onClick={playHandle}>
      <div className="p-4 h-full flex flex-col relative rounded-md" style={{ backgroundColor: "rgba(0, 0, 0, .75)" }}>
        <Header artistName={data.artist.name} title={data.title} link={data.link} />

        <audio
          ref={audioRef}
          className="hidden"
          src={data.preview}
          tabIndex={-1}
          onEnded={(e) => updateCurrentAudioState(e.currentTarget.currentTime, undefined, false)}
          onLoadedMetadata={(e) => updateCurrentAudioState(e.currentTarget.currentTime, e.currentTarget.duration)}
          onTimeUpdate={onTimeUpdateAudioHandler}
        />

        <Footer currentAudioState={currentAudioState} timeBarClickHandler={timeBarClickHandler} audioLinePos={audioLinePos} />
      </div>
    </div>
  );
}

export default MusicCard;
