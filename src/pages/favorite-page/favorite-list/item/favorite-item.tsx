import { memo, SyntheticEvent, useEffect, useRef, useState } from 'react';

import useZustandStore from "@zustand/zustandStore.ts";

import ControlBar
  from "@favorite-page/favorite-list/item/control-bar/control-bar.tsx";
import Info from "@favorite-page/favorite-list/item/info/info.tsx";
import AudioLine from "@favorite-page/favorite-list/item/audio-line/audio-line.tsx";

import { calculateAudioTimelineByTimeUpdate } from "@src/helpers/calculate-audio-timeline.ts";

import { ISearch } from "@src/api/interfaces.ts";

type Props = {
  data: ISearch,
  isPlaying: boolean,
  setCurrentPlayingAudio: React.Dispatch<React.SetStateAction<number | null>>,
}

const FavoriteItem = memo(({ data, isPlaying, setCurrentPlayingAudio }: Props) => {
  const [linePosition, setLinePosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const removeFromFavoriteList = useZustandStore(state => state.removeFromFavoriteList);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying, audioRef]);

  const onPlayClickHandler = () => setCurrentPlayingAudio(!isPlaying ? Number(data.id) : null);

  const onDeleteClickHandler = () => {
    audioRef.current?.pause();
    removeFromFavoriteList(Number(data.id))
  };

  const onTimeUpdateHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    if (!isDragging) {
      const { currentTarget } = e;
      const currentSongPercent = calculateAudioTimelineByTimeUpdate(currentTarget);
      setLinePosition(currentSongPercent);
    }
  }

  const doStateChanges = (draggingFlag?: boolean, newPosition?: number) => {
    if (draggingFlag !== undefined) {
      setIsDragging(draggingFlag);
    }
    if (newPosition !== undefined) {
      setLinePosition(newPosition);
    }
  }

  return (
    <li className="flex pt-4">
      <div className="flex flex-col flex-1 space-y-4">
        <Info data={data} />
        <ControlBar
          isPlaying={isPlaying}
          onPlayClickHandler={onPlayClickHandler}
          onDeleteClickHandler={onDeleteClickHandler}
        >
          <AudioLine
            audioRef={audioRef}
            linePosition={linePosition}
            doStateChanges={doStateChanges}
            isDragging={isDragging}
          />
        </ControlBar>
      </div>
      <audio
        preload="metadata"
        ref={audioRef}
        src={data.preview}
        onTimeUpdate={onTimeUpdateHandler}
        onEnded={() => setCurrentPlayingAudio(null)}
      />
    </li>
  );
})

export default FavoriteItem;
