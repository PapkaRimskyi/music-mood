import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

function AudioControlBar() {
  const { audioData } = useSearch();

  const currentAudioPlayState = useZustandStore(state => state.currentAudioPlayState);
  const updateCurrentAudioPlayState = useZustandStore(state => state.updateCurrentAudioPlayState);
  const isCurrentAudioFirst = useZustandStore(state => state.isCurrentAudioFirst);
  const setPreviousAudioId = useZustandStore(state => state.setPreviousAudioId);
  const isCurrentAudioLast = useZustandStore(state => state.isCurrentAudioLast);
  const setNextAudioId = useZustandStore(state => state.setNextAudioId);

  const isPrevAudioButtonDisabled = isCurrentAudioFirst(audioData);
  const isNextAudioButtonDisabled = isCurrentAudioLast(audioData);
  const playAudioButtonBgClass = currentAudioPlayState ? 'bg-pause-image' : 'bg-play-image';

  const prevAudioButtonHandler = () => setPreviousAudioId(audioData);

  const playAudioButtonHandler = () => updateCurrentAudioPlayState();

  const nextAudioButtonHandler = () => setNextAudioId(audioData);

  return (
    <div className='flex items-center space-x-3'>
      <div className="flex">
        <button
          className="w-4 h-4 bg-previous-image bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60 disabled:opacity-10 disabled:cursor-not-allowed"
          type="button"
          disabled={isPrevAudioButtonDisabled}
          onClick={prevAudioButtonHandler}
        />
      </div>
      <div className="flex">
        <button
          className={`w-4 h-4 ${playAudioButtonBgClass} bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60`}
          type="button"
          onClick={playAudioButtonHandler}
        />
      </div>
      <div className="flex">
        <button
          className="w-4 h-4 bg-next-image bg-no-repeat bg-center bg-contain hover:opacity-80 active:opacity-60 disabled:opacity-10 disabled:cursor-not-allowed"
          type="button"
          onClick={nextAudioButtonHandler}
          disabled={isNextAudioButtonDisabled}
        />
      </div>
    </div>
  );
}

export default AudioControlBar;
