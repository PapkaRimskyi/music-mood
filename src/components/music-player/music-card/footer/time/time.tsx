import useCurrentSong from "../../../../../zustand/useCurrentSong/useCurrentSong.ts";

function Time() {
  const currentSongInfo = useCurrentSong(state => state.currentSongInfo);

  return (
    <div>
      <p className="text-sm">{Math.floor(currentSongInfo.time)}s/{Math.floor(currentSongInfo.duration)}s</p>
    </div>
  );
}

export default Time;
