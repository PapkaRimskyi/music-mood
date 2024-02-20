import { useEffect, useRef } from "react";

import useSearch from "@src/api/useSearch/useSearch.ts";

import useZustandStore from "@zustand/zustandStore.ts";

import Item from "./item/item.tsx";

function AudioList() {
  const activeAudioRef = useRef<HTMLLIElement>(null);

  const { audioData } = useSearch();

  const currentSongId = useZustandStore(state => state.currentSongId);
  const shuffledList = useZustandStore(state => state.shuffledList);

  useEffect(() => {
    activeAudioRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSongId, shuffledList]);

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
      </ul>
    </div>
  );
}

export default AudioList;
