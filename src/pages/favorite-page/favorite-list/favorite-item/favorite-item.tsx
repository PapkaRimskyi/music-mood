import { memo, SyntheticEvent, useEffect, useRef, useState } from 'react';

import useZustandStore from "@zustand/zustandStore.ts";

import FavoriteControlBar
  from "@favorite-page/favorite-list/favorite-item/favorite-control-bar/favorite-control-bar.tsx";
import FavoriteInfo from "@favorite-page/favorite-list/favorite-item/favorite-info/favorite-info.tsx";
import FavoriteAudioline from "@favorite-page/favorite-list/favorite-item/favorite-audioline/favorite-audioline.tsx";

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

  const onDeleteClickHandler = () => removeFromFavoriteList(Number(data.id));

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
      <div className="flex flex-wrap flex-1 space-y-2">
        <FavoriteInfo data={data} />
        <FavoriteControlBar
          isPlaying={isPlaying}
          onPlayClickHandler={onPlayClickHandler}
          onDeleteClickHandler={onDeleteClickHandler}
        >
          <FavoriteAudioline
            audioRef={audioRef}
            linePosition={linePosition}
            doStateChanges={doStateChanges}
            isDragging={isDragging}
          />
        </FavoriteControlBar>
      </div>
      <audio
        ref={audioRef}
        src={data.preview}
        onTimeUpdate={onTimeUpdateHandler}
        onEnded={() => setCurrentPlayingAudio(null)}
      />
    </li>
  );
})

export default FavoriteItem;
