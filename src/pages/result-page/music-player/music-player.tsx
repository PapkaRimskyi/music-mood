import { MouseEvent, SyntheticEvent, useEffect, useRef, useState } from "react";

import useZustandStore from "@zustand/zustandStore.ts";

import Header from "@result-page/music-player/header/header.tsx";
import Footer from "@result-page/music-player/footer/footer.tsx";

import { calculateAudioTimelineByClick, calculateAudioTimelineByTimeUpdate } from "@src/helpers/calculate-audio-timeline.ts";

import { HUNDRED_PERCENT } from "@src/const/common.ts";
import { MusicCardContext } from "@src/const/context.ts";

import { ISearch } from "@src/api/interfaces.ts";

import style from './style.module.css';

type Props = {
  audioData: ISearch[],
  currentAudio: ISearch;
}

function MusicPlayer({ audioData, currentAudio }: Props) {
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
  }, [currentAudioPlayState, isShuffled, audioRef.current]);

  const updateAudioLinePos = (element: HTMLAudioElement) => {
    const currentSongPercent = calculateAudioTimelineByTimeUpdate(element);
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
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const { duration } = currentAudioInfo;
    const newAudioLineGradientPercent = calculateAudioTimelineByClick(left, width, e.clientX);
    (audioRef.current as HTMLAudioElement).currentTime = duration * newAudioLineGradientPercent / HUNDRED_PERCENT;
    setAudioLinePos(newAudioLineGradientPercent);
  }

  return (
    <div className={`w-full lg:w-3/5 h-[400px] sm:h-[600px] rounded-lg bg-no-repeat bg-center ${style.container}`} style={{ backgroundImage: `url(${currentAudio.album.cover_xl})` }}>
      <div className="p-4 h-full flex flex-col relative rounded-md" style={{ backgroundColor: "rgba(0, 0, 0, .75)" }}>
        <Header currentAudio={currentAudio} />

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
            currentAudioPlayState && audioRef.current?.play();
          }}
          onTimeUpdate={onTimeUpdateAudioHandler}
        />

        <MusicCardContext.Provider value={{ timeBarClickHandler, audioLinePos }}>
          <Footer />
        </MusicCardContext.Provider>
      </div>
    </div>
  );
}

export default MusicPlayer;
