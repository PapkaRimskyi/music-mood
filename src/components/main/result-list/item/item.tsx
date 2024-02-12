import { useRef, SyntheticEvent, MouseEvent } from "react";

import { ISearch } from "../../../../api/interfaces.ts";

import style from './style.module.css';

type Props = {
  data: ISearch,
}

const HUNDRED_PERCENT = 100;

function Item({ data }: Props) {
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
  }

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
        <audio className="hidden" tabIndex={-1} onTimeUpdate={changeCurrentTimeBar} ref={audioRef} src={data.preview} controls></audio>
        <div className="mt-auto flex flex-col">
          <div className={`ml-auto ${style.soundButton}`} />
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
