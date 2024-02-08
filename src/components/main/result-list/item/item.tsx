import { SyntheticEvent, useRef } from "react";

import { ISearch } from "../../../../api/interfaces.ts";

import style from './style.module.css';

type Props = {
  data: ISearch,
}

function Item({ data }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioLineRef = useRef<HTMLDivElement>(null);

  function changeCurrentTimeBar(e: SyntheticEvent<HTMLAudioElement, Event>) {
    const { currentTime, duration, ended } = e.currentTarget;
    const currentSongPercent = Math.floor((Math.floor(currentTime) * 100) / Math.floor(duration));
    (audioLineRef.current as HTMLDivElement).style.backgroundImage = `linear-gradient(90deg, #7E30E1 ${currentSongPercent}%, #E26EE5 ${!ended ? currentSongPercent + 1 : 100}%)`;
  }

  return (
    <li className={`bg-no-repeat bg-center bg-cover overflow-hidden ${style.musicCard}`} style={{ backgroundImage: `url(${data.album.cover_xl})` }}>
      <div className="p-4 h-full flex flex-col" style={{ backgroundColor: "rgba(0, 0, 0, .75)" }}>
        <div>
          <h1 title={`${data.artist.name} - ${data.title}`} className="overflow-hidden text-ellipsis whitespace-nowrap swiper-no-swiping underline cursor-pointer">{data.artist.name} - {data.title}</h1>
        </div>
        <audio onTimeUpdate={changeCurrentTimeBar} ref={audioRef} src={data.preview} controls></audio>
        <div className={`mt-auto swiper-no-swiping cursor-pointer ${style.audioLineContainer}`}>
          <div ref={audioLineRef} className={`my-3 ${style.audioLine}`} />
        </div>
      </div>
    </li>
  );
}

export default Item;
