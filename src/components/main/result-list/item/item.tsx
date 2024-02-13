import { useState, useRef, SyntheticEvent, MouseEvent } from "react";

import { ISearch } from "../../../../api/interfaces.ts";

import style from './style.module.css';
import Time from "./time/time.tsx";

type Props = {
  data: ISearch,
}

const HUNDRED_PERCENT = 100;
const DEFAULT_VOLUME_LVL = 0.10;

function Item({ data }: Props) {
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const musicCardRef = useRef<HTMLLIElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioLineRef = useRef<HTMLDivElement>(null);

  const playButtonClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (audioRef.current) {
      const { current } = audioRef;
      if (!current.paused) {
        current.pause();
        (e.currentTarget as HTMLLIElement).classList.remove(style.musicCardPlaying);
        (e.currentTarget as HTMLLIElement).classList.add(style.musicCardPaused);
      } else {
        current.play();
        (e.currentTarget as HTMLLIElement).classList.add(style.musicCardPlaying);
        (e.currentTarget as HTMLLIElement).classList.remove(style.musicCardPaused);
      }
    }
    console.log(document.querySelector(`audio[src="${data.preview}"]`));
  }

  const changeCurrentTimeBarByClicking = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const { duration } = audioRef.current as HTMLAudioElement;
    const clickCoords = e.clientX - left;
    const newAudioLineGradientPercent = Math.floor(Math.floor(clickCoords) * HUNDRED_PERCENT / width);
    (audioLineRef.current as HTMLDivElement).style.backgroundImage = `linear-gradient(90deg, #7E30E1 ${newAudioLineGradientPercent}%, #E26EE5 ${newAudioLineGradientPercent !== HUNDRED_PERCENT ? newAudioLineGradientPercent : HUNDRED_PERCENT}%)`;
    (audioRef.current as HTMLAudioElement).currentTime = duration * newAudioLineGradientPercent / HUNDRED_PERCENT;
  }

  const changeCurrentTimeBar = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const { currentTime, duration, ended } = e.currentTarget;
    const currentSongPercent = Math.floor((Math.floor(currentTime) * HUNDRED_PERCENT) / Math.floor(duration));
    (audioLineRef.current as HTMLDivElement).style.backgroundImage = `linear-gradient(90deg, #7E30E1 ${currentSongPercent}%, #E26EE5 ${!ended ? currentSongPercent + 1 : HUNDRED_PERCENT}%)`;
    if (ended) {
      musicCardRef.current!.classList.remove(style.musicCardPlaying);
    }
    setCurrentAudioTime(Math.floor(currentTime));
  }

  const handleOnLoadedMetaData = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    e.currentTarget.volume = DEFAULT_VOLUME_LVL;
    setAudioDuration(Math.floor(e.currentTarget.duration));
  };

  return (
    <li
      ref={musicCardRef}
      className={`bg-no-repeat bg-center bg-cover overflow-hidden relative ${style.musicCard}`}
      onClick={playButtonClickHandler}
      style={{ backgroundImage: `url(${data.album.cover_xl})` }}
    >
      <div className="p-4 h-full flex flex-col relative" style={{ backgroundColor: "rgba(0, 0, 0, .75)" }}>
        <div>
          <a
            className="block overflow-hidden text-ellipsis whitespace-nowrap swiper-no-swiping underline cursor-pointer"
            href={data.link}
            onClick={(e) => e.stopPropagation()}
            title={`${data.artist.name} - ${data.title}`}
            target="_blank"
          >
            {data.artist.name} - {data.title}
          </a>
        </div>
        <audio
          ref={audioRef}
          className="hidden"
          src={data.preview}
          tabIndex={-1}
          onTimeUpdate={changeCurrentTimeBar}
          onLoadedMetadata={handleOnLoadedMetaData}
        ></audio>
        <div className="mt-auto flex flex-col">
          <Time currentTime={currentAudioTime} duration={audioDuration} />
          <div
            className={`swiper-no-swiping cursor-pointer ${style.audioLineContainer}`}
            onClick={changeCurrentTimeBarByClicking}
          >
            <div ref={audioLineRef} className={`my-3 ${style.audioLine}`} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default Item;
