import { MouseEvent, SyntheticEvent, useEffect, useRef, useState } from "react";

import useZustandStore from "@zustand/zustandStore.ts";

import AudioHeader from "@src/pages/result-page/audio-card/audio-header/audio-header.tsx";
import AudioFooter from "@src/pages/result-page/audio-card/audio-footer/audio-footer.tsx";

import { HUNDRED_PERCENT } from "@src/const/common.ts";
import { MusicCardContext } from "@src/const/context.ts";

import { ISearch } from "@src/api/interfaces.ts";

import style from './style.module.css';

type Props = {
  audioData: ISearch[],
  currentAudio: ISearch;
}

function AudioCard({ audioData, currentAudio }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioLinePos, setAudioLinePos] = useState(0);

  const currentAudioInfo = useZustandStore(state => state.currentAudioInfo);
  const updateCurrentAudioInfo = useZustandStore(state => state.updateCurrentAudioInfo);
  const currentAudioPlayState = useZustandStore(state => state.currentAudioPlayState);
  const updateCurrentAudioPlayState = useZustandStore(state => state.updateCurrentAudioPlayState);
  const isRepeating = useZustandStore(state => state.isRepeating);
  const isShuffled = useZustandStore(state => state.isBeingShuffled);
  const setNextAudioId = useZustandStore(state => state.setNextAudioId);

  useEffect(() => {
    if (audioRef.current) {
      const audioElem = audioRef.current;
      currentAudioPlayState ? audioElem.play() : audioElem.pause();
    }
  }, [currentAudioPlayState, audioRef.current]);

  const updateAudioLinePos = (element: HTMLAudioElement) => {
    const { currentTime, duration } = element;
    const currentSongPercent = Math.floor((Math.floor(currentTime) * HUNDRED_PERCENT) / Math.floor(duration));
    setAudioLinePos(currentSongPercent);
  }

  const onTimeUpdateAudioHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const { currentTarget } = e;
    updateCurrentAudioInfo(currentTarget.currentTime);
    updateAudioLinePos(currentTarget);
  }

  const onEndedAudioHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    if (isShuffled) {
      setNextAudioId(audioData);
    } else {
      updateCurrentAudioInfo(e.currentTarget.currentTime, undefined);
      updateCurrentAudioPlayState();
    }
  }

  const timeBarClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const { duration } = currentAudioInfo;
    const clickCoords = e.clientX - left;
    const newAudioLineGradientPercent = Math.floor(Math.floor(clickCoords) * HUNDRED_PERCENT / width);
    (audioRef.current as HTMLAudioElement).currentTime = duration * newAudioLineGradientPercent / HUNDRED_PERCENT;
    setAudioLinePos(newAudioLineGradientPercent);
  }

  return (
    <div className={`w-full lg:w-3/5 h-[600px] rounded-lg bg-no-repeat bg-center ${style.container}`} style={{ backgroundImage: `url(${currentAudio.album.cover_xl})` }}>
      <div className="p-4 h-full flex flex-col relative rounded-md" style={{ backgroundColor: "rgba(0, 0, 0, .75)" }}>
        <AudioHeader
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
          onLoadedMetadata={(e) => {
            setAudioLinePos(0);
            updateCurrentAudioInfo(e.currentTarget.currentTime, e.currentTarget.duration);
            updateCurrentAudioPlayState(false);
          }}
          onTimeUpdate={onTimeUpdateAudioHandler}
        />

        <MusicCardContext.Provider value={{ timeBarClickHandler, audioLinePos }}>
          <AudioFooter />
        </MusicCardContext.Provider>
      </div>
    </div>
  );
}

export default AudioCard;
