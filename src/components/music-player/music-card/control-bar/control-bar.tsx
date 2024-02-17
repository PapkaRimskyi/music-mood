import { useContext } from "react";

import useSearch from "../../../../api/useSearch/useSearch.ts";
import useCurrentSong from "../../../../zustand/useCurrentSong/useCurrentSong.ts";

import { MusicCardContext, TMusicCardContext } from "../../../../const/context.ts";

import style from './style.module.css';

function ControlBar() {
  const { audioRef } = useContext(MusicCardContext) as TMusicCardContext;
  const { singerData } = useSearch();
  const currentSongIndex = useCurrentSong(state => state.currentSongIndex);
  const isCurrentSongFirst = useCurrentSong(state => state.isCurrentSongFirst);
  const isCurrentSongLast = useCurrentSong(state => state.isCurrentSongLast);
  const changeCurrentSong = useCurrentSong(state => state.changeCurrentSong);

  const previousSong = () => {
    if (!isCurrentSongFirst()) {
      changeCurrentSong(currentSongIndex - 1);
    }
  }

  const playHandle = () => {
    if (audioRef.current) {
      const audioElem = audioRef.current;
      !audioElem.paused ? audioElem.pause() : audioElem.play();
    }
  }

  const nextSong = () => {
    if (singerData?.data && !isCurrentSongLast(singerData.data)) {
      changeCurrentSong(currentSongIndex + 1);
    }
  }

  return (
    <div className='flex items-center'>
      <div className={`flex ${style.controlButtonContainer}`}>
        <button className={`bg-no-repeat bg-center bg-contain ${style.controlButton}`} type="button" onClick={previousSong} />
      </div>
      <div className={`flex mx-3 ${style.controlButtonContainer}`}>
        <button className={`bg-no-repeat bg-center bg-contain ${style.controlButton}`} type="button" onClick={playHandle} />
      </div>
      <div className={`flex ${style.controlButtonContainer}`}>
        <button className={`bg-no-repeat bg-center bg-contain ${style.controlButton}`} type="button" onClick={nextSong} />
      </div>
    </div>
  );
}

export default ControlBar;
