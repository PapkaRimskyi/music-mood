import { MouseEvent, SyntheticEvent, useRef, useState } from "react";

import useZustandStore from "@zustand/zustandStore.ts";

import Header from "./header/header.tsx";
import Footer from "./footer/footer.tsx";

import { HUNDRED_PERCENT } from "@src/const/common.ts";
import { MusicCardContext } from "@src/const/context.ts";

import { ISearch } from "@src/api/interfaces.ts";

import style from './style.module.css';

type Props = {
  audioData: ISearch[],
  currentAudio: ISearch;
}

function MusicCard({ audioData, currentAudio }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioLinePos, setAudioLinePos] = useState(0);

  const currentSongInfo = useZustandStore(state => state.currentSongInfo);
  const updateSong = useZustandStore(state => state.updateSong);
  const isRepeating = useZustandStore(state => state.isRepeating);
  const isShuffled = useZustandStore(state => state.isBeingShuffled);
  const setNextSongId = useZustandStore(state => state.setNextSongId);

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

  const onEndedAudioHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    if (isShuffled) {
      setNextSongId(audioData);
    } else {
      updateSong(e.currentTarget.currentTime, undefined, false);
    }
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
    <div className={`w-full lg:w-3/5 rounded-lg bg-no-repeat bg-center ${style.container}`} style={{ backgroundImage: `url(${currentAudio.album.cover_xl})` }}>
      <div className="p-4 h-full flex flex-col relative rounded-md" style={{ backgroundColor: "rgba(0, 0, 0, .75)" }}>
        <Header
          artistName={currentAudio.artist.name}
          title={currentAudio.title}
          link={currentAudio.link}
        />

        <audio
          ref={audioRef}
          className="hidden"
          src={currentAudio.preview}
          loop={isRepeating}
          autoPlay={isShuffled}
          tabIndex={-1}
          onEnded={onEndedAudioHandler}
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
