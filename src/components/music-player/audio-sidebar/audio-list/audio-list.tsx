import { useEffect, useRef } from "react";

import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

import Item from "./item/item.tsx";
import LoadMore from "@components/music-player/audio-sidebar/audio-list/load-more/load-more.tsx";

function AudioList() {
  const activeAudioRef = useRef<HTMLLIElement>(null);

  const { audioData, next } = useSearch();

  const currentSongId = useZustandStore(state => state.currentSongId);
  const isBeingShuffled = useZustandStore(state => state.isBeingShuffled);

  useEffect(() => {
    activeAudioRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSongId, isBeingShuffled]);

  return (
    <div className="max-h-80 overflow-auto rounded-lg">
      <ul>
        {audioData.map((item) => (
          <Item
            key={item.id}
            data={item}
            activeAudioRef={activeAudioRef}
            isActive={Number(item.id) === currentSongId}
          />
        ))}
        {next && !isBeingShuffled && <LoadMore />}
      </ul>
    </div>
  );
}

export default AudioList;
