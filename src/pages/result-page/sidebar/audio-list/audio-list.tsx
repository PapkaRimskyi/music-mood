import { useEffect, useRef } from "react";

import useSearch from "@src/api/swr-api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

import Item from "@result-page/sidebar/audio-list/item/item.tsx";
import LoadMore from "@result-page/sidebar/audio-list/load-more/load-more.tsx";

function AudioList() {
  const activeAudioRef = useRef<HTMLLIElement>(null);

  const { audioData, next } = useSearch();

  const currentAudioId = useZustandStore(state => state.currentAudioId);
  const isBeingShuffled = useZustandStore(state => state.isBeingShuffled);
  const favoriteList = useZustandStore(state => state.favoriteList);

  useEffect(() => {
    activeAudioRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentAudioId, isBeingShuffled]);

  return (
    <div className="max-h-80 overflow-auto rounded-lg">
      <ul>
        {audioData?.map((item) => (
          <Item
            key={item.id}
            data={item}
            activeAudioRef={activeAudioRef}
            isPlaying={Number(item.id) === currentAudioId}
            isFavorite={favoriteList.has(Number(item.id))}
          />
        ))}
        {next && !isBeingShuffled && <LoadMore />}
      </ul>
    </div>
  );
}

export default AudioList;
