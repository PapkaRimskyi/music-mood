import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

import ModeButton from "@result-page/sidebar/audio-mode-panel/mode-button/mode-button.tsx";

function AudioModePanel() {
  const { audioData } = useSearch();

  const isRepeating = useZustandStore(state => state.isRepeating);
  const changeRepeatingFlag = useZustandStore(state => state.changeRepeatingFlag);
  const isBeingShuffled = useZustandStore(state => state.isBeingShuffled);
  const setShuffledList = useZustandStore(state => state.setShuffledList);
  const generateShuffledList = useZustandStore(state => state.generateShuffledList);
  const changeShuffleFlag = useZustandStore(state => state.changeShuffleFlag);

  function shuffleButtonHandler() {
    if (!isBeingShuffled) {
      generateShuffledList(audioData);
    } else {
      setShuffledList(null);
    }
    changeShuffleFlag();
  }

  return (
    <div className="mt-4 flex justify-around">
      <div className="flex">
        <ModeButton className="bg-loop-image" isActive={isRepeating} title='Loop current track' onClick={changeRepeatingFlag} />
      </div>
      <div className="flex">
        <ModeButton className="bg-shuffle-image" isActive={isBeingShuffled} title='Shuffle audiolist' onClick={shuffleButtonHandler} />
      </div>
    </div>
  );
}

export default AudioModePanel;
