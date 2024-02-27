import { useEffect, useRef } from "react";

import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

import AudioItem from "./audio-item/audio-item.tsx";
import LoadMoreAudio from "./load-more-audio/load-more-audio.tsx";

function AudioList() {
  const activeAudioRef = useRef<HTMLLIElement>(null);

  const { audioData, next } = useSearch();

  const currentAudioId = useZustandStore(state => state.currentAudioId);
  const isBeingShuffled = useZustandStore(state => state.isBeingShuffled);

  useEffect(() => {
    activeAudioRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentAudioId, isBeingShuffled]);

  return (
    <div className="max-h-80 overflow-auto rounded-lg">
      <ul>
        {audioData?.map((item) => (
          <AudioItem
            key={item.id}
            data={item}
            activeAudioRef={activeAudioRef}
            isActive={Number(item.id) === currentAudioId}
          />
        ))}
        {next && !isBeingShuffled && <LoadMoreAudio />}
      </ul>
    </div>
  );
}

export default AudioList;
