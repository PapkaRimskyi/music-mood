import useSearch from "@src/api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

import Button from "@components/music-player/audio-sidebar/repeat-and-loop-controller/button/button.tsx";

function RepeatAndLoopController() {
  const { audioData } = useSearch();

  const isRepeating = useZustandStore(state => state.isRepeating);
  const changeRepeatingFlag = useZustandStore(state => state.changeRepeatingFlag);
  const isBeingShuffled = useZustandStore(state => state.isBeingShuffled);
  const setShuffledList = useZustandStore(state => state.setShuffledList);
  const generateShuffleList = useZustandStore(state => state.generateShuffleList);
  const changeShuffleFlag = useZustandStore(state => state.changeShuffleFlag);

  function shuffleButtonHandler() {
    if (!isBeingShuffled) {
      generateShuffleList(audioData);
    } else {
      setShuffledList(null);
    }
    changeShuffleFlag();
  }

  return (
    <div className="mt-4 flex justify-around">
      <div className="flex">
        <Button className="bg-loop-image" isActive={isRepeating} title='Зациклить текущий трек' onClick={changeRepeatingFlag} />
      </div>
      <div className="flex">
        <Button className="bg-shuffle-image" isActive={isBeingShuffled} title='Перемешать аудиолист' onClick={shuffleButtonHandler} />
      </div>
    </div>
  );
}

export default RepeatAndLoopController;
