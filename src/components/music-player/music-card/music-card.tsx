import { MouseEvent, SyntheticEvent, useRef, useState } from "react";

import useCurrentSong from "../../../zustand/useCurrentSong/useCurrentSong.ts";

import Header from "./header/header.tsx";
import Footer from "./footer/footer.tsx";

import { HUNDRED_PERCENT } from "../../../const/common.ts";
import { MusicCardContext } from "../../../const/context.ts";

import { ISearch } from "../../../api/interfaces.ts";

import style from './style.module.css';

type Props = {
  data: ISearch;
}

function MusicCard({ data }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSongInfo = useCurrentSong(state => state.currentSongInfo);
  const updateSong = useCurrentSong(state => state.updateSong);
  const [audioLinePos, setAudioLinePos] = useState(0);

  const updateAudioLinePos = (element: HTMLAudioElement) => {
    const { currentTime, duration } = element;
    const currentSongPercent = Math.floor((Math.floor(currentTime) * HUNDRED_PERCENT) / Math.floor(duration));
    setAudioLinePos(currentSongPercent);
  }

  const onTimeUpdateAudioHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const { currentTarget } = e;
    updateSong(currentTarget.currentTime);
    updateAudioLinePos(currentTarget);
  }

  const timeBarClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const { duration } = currentSongInfo;
    const clickCoords = e.clientX - left;
    const newAudioLineGradientPercent = Math.floor(Math.floor(clickCoords) * HUNDRED_PERCENT / width);
    (audioRef.current as HTMLAudioElement).currentTime = duration * newAudioLineGradientPercent / HUNDRED_PERCENT;
    setAudioLinePos(newAudioLineGradientPercent);
  }

  return (
    <div className={`rounded-lg w-full lg:w-3/5 ${style.container}`} style={{ backgroundImage: `url(${data.album.cover_xl})` }}>
      <div className="p-4 h-full flex flex-col relative rounded-md" style={{ backgroundColor: "rgba(0, 0, 0, .75)" }}>
        <Header
          artistName={data.artist.name}
          title={data.title}
          link={data.link}
        />

        <audio
          ref={audioRef}
          className="hidden"
          src={data.preview}
          tabIndex={-1}
          onEnded={(e) => updateSong(e.currentTarget.currentTime, undefined, false)}
          onLoadedMetadata={(e) => updateSong(e.currentTarget.currentTime, e.currentTarget.duration)}
          onTimeUpdate={onTimeUpdateAudioHandler}
        />

        <MusicCardContext.Provider value={{ audioRef, timeBarClickHandler, audioLinePos }}>
          <Footer />
        </MusicCardContext.Provider>
      </div>
    </div>
  );
}

export default MusicCard;
