import useZustandStore from "@zustand/zustandStore.ts";

function AudioTimeInfo() {
  const currentAudioInfo = useZustandStore(state => state.currentAudioInfo);

  return (
    <div>
      <p className="text-sm">{Math.floor(currentAudioInfo.time)}s/{Math.floor(currentAudioInfo.duration)}s</p>
    </div>
  );
}

export default AudioTimeInfo;
