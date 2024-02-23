import { useContext } from "react";

import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";
import useZustandStore from "@zustand/zustandStore.ts";

import { MusicCardContext, TMusicCardContext } from "@src/const/context.ts";

function ControlBar() {
  const { audioRef } = useContext(MusicCardContext) as TMusicCardContext;
  const { audioData } = useSearch();

  const isCurrentSongFirst = useZustandStore(state => state.isCurrentSongFirst);
  const setPreviousSongId = useZustandStore(state => state.setPreviousSongId);
  const isCurrentSongLast = useZustandStore(state => state.isCurrentSongLast);
  const setNextSongId = useZustandStore(state => state.setNextSongId);

  const isPrevButtonDisabled = isCurrentSongFirst(audioData);
  const isNextButtonDisabled = isCurrentSongLast(audioData);
  const playButtonBgClass = !audioRef.current?.paused ? 'bg-pause-image' : 'bg-play-image';

  const previousSongHandler = () => setPreviousSongId(audioData);

  const playSongHandle = () => {
    if (audioRef.current) {
      const audioElem = audioRef.current;
      !audioElem.paused ? audioElem.pause() : audioElem.play();
    }
  }

  const nextSongHandler = () => setNextSongId(audioData);

  return (
    <div className='flex items-center space-x-3'>
      <div className="flex">
        <button
          className="w-4 h-4 bg-previous-image bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60 disabled:opacity-10 disabled:cursor-not-allowed"
          type="button"
          disabled={isPrevButtonDisabled}
          onClick={previousSongHandler}
        />
      </div>
      <div className="flex">
        <button
          className={`w-4 h-4 ${playButtonBgClass} bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60`}
          type="button"
          onClick={playSongHandle}
        />
      </div>
      <div className="flex">
        <button
          className="w-4 h-4 bg-next-image bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60 disabled:opacity-10 disabled:cursor-not-allowed"
          type="button"
          onClick={nextSongHandler}
          disabled={isNextButtonDisabled}
        />
      </div>
    </div>
  );
}

export default ControlBar;
