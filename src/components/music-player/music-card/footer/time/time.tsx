import useZustandStore from "@zustand/zustandStore.ts";

function Time() {
  const currentSongInfo = useZustandStore(state => state.currentSongInfo);

  return (
    <div>
      <p className="text-sm">{Math.floor(currentSongInfo.time)}s/{Math.floor(currentSongInfo.duration)}s</p>
    </div>
  );
}

export default Time;
