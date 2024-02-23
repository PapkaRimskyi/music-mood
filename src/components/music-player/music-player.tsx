import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

import MusicCard from "./music-card/music-card.tsx";
import AudioSidebar from "./audio-sidebar/audio-sidebar.tsx";

function MusicPlayer() {
  const { audioData, isLoading } = useSearch();

  const currentSongId = useZustandStore(state => state.currentSongId);

  const currentAudio = audioData.find((item) => Number(item.id) === currentSongId);

  return (
    <div>
      {!isLoading && currentAudio && (
        <div className="mx-auto w-full lg:w-10/12 xl:w-8/12 flex flex-col lg:flex-row justify-between">
          <MusicCard audioData={audioData} currentAudio={currentAudio} />
          <AudioSidebar />
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
