import { useEffect } from "react";

import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

import MusicPlayer from "@result-page/music-player/music-player.tsx";
import AudioSidebar from "@result-page/sidebar/audio-sidebar.tsx";
import LoadingScreen from "./loading-screen/loading-screen.tsx";

import { ISearch } from "@src/api/interfaces.ts";

function ResultPage() {
  const { audioData, isLoading, isError, mutate } = useSearch();

  const currentAudioId = useZustandStore(state => state.currentAudioId);
  const changeCurrentAudio = useZustandStore(state => state.changeCurrentAudio);
  const resetAllAudioInfo = useZustandStore(state => state.resetAllAudioInfo);

  const currentAudio = audioData?.find((item) => Number(item.id) === currentAudioId);

  useEffect(() => {
    if (audioData && !currentAudio) {
      changeCurrentAudio(Number(audioData[0].id));
    }
  }, [audioData]);

  useEffect(() => {
    return () => {
      changeCurrentAudio(null);
      resetAllAudioInfo();
    }
  }, [])

  return (
    <section>
      {currentAudio ? (
        <div className="mx-auto w-full lg:w-10/12 xl:w-8/12 flex flex-col lg:flex-row justify-between">
          <MusicPlayer audioData={audioData as ISearch[]} currentAudio={currentAudio} />
          <AudioSidebar />
        </div>
      ) : <LoadingScreen isLoading={isLoading} isError={Boolean(isError)} audioData={audioData} mutate={mutate} />}
    </section>
  );
}

export default ResultPage;
