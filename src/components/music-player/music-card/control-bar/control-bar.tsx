import { useContext } from "react";

import useSearch from "../../../../api/useSearch/useSearch.ts";
import useCurrentSong from "../../../../zustand/useCurrentSong/useCurrentSong.ts";

import { MusicCardContext, TMusicCardContext } from "../../../../const/context.ts";

import style from './style.module.css';

function ControlBar() {
  const { audioRef } = useContext(MusicCardContext) as TMusicCardContext;
  const { audioData } = useSearch();
  const currentSongId = useCurrentSong(state => state.currentSongId) as number;
  const isCurrentSongFirst = useCurrentSong(state => state.isCurrentSongFirst);
  const isCurrentSongLast = useCurrentSong(state => state.isCurrentSongLast);
  const changeCurrentSong = useCurrentSong(state => state.changeCurrentSong);

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
