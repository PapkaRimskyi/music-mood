import { useContext } from "react";

import useSearch from "../../../../api/useSearch/useSearch.ts";
import useCurrentSong from "../../../../zustand/useCurrentSong/useCurrentSong.ts";

import { MusicCardContext, TMusicCardContext } from "../../../../const/context.ts";

function ControlBar() {
  const { audioRef } = useContext(MusicCardContext) as TMusicCardContext;
  const { audioData } = useSearch();
  const currentSongId = useCurrentSong(state => state.currentSongId) as number;
  const isCurrentSongFirst = useCurrentSong(state => state.isCurrentSongFirst);
  const isCurrentSongLast = useCurrentSong(state => state.isCurrentSongLast);
  const changeCurrentSong = useCurrentSong(state => state.changeCurrentSong);

  const isPrevButtonDisabled = isCurrentSongFirst(audioData);
  const isNextButtonDisabled = isCurrentSongLast(audioData);
  const playButtonBgClass = !audioRef.current?.paused ? 'bg-pause-image' : 'bg-play-image';

  const previousSong = () => {
    if (!isCurrentSongFirst(audioData)) {
      const nextSongId = audioData[audioData.findIndex((item) => Number(item.id) === currentSongId) - 1].id;
      changeCurrentSong(Number(nextSongId));
    }
  }

  const playHandle = () => {
    if (audioRef.current) {
      const audioElem = audioRef.current;
      !audioElem.paused ? audioElem.pause() : audioElem.play();
    }
  }

  const nextSong = () => {
    if (!isCurrentSongLast(audioData)) {
      const nextSongId = audioData[audioData.findIndex((item) => Number(item.id) === currentSongId) + 1].id;
      changeCurrentSong(Number(nextSongId));
    }
  }

  return (
    <div className='flex items-center space-x-3'>
      <div className="flex">
        <button
          className="w-4 h-4 bg-previous-image bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60 disabled:opacity-10 disabled:cursor-not-allowed"
          type="button"
          disabled={isPrevButtonDisabled}
          onClick={previousSong}
        />
      </div>
      <div className="flex">
        <button
          className={`w-4 h-4 ${playButtonBgClass} bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60`}
          type="button"
          onClick={playHandle}
        />
      </div>
      <div className="flex">
        <button
          className="w-4 h-4 bg-next-image bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60 disabled:opacity-10 disabled:cursor-not-allowed"
          type="button"
          onClick={nextSong}
          disabled={isNextButtonDisabled}
        />
      </div>
    </div>
  );
}

export default ControlBar;
