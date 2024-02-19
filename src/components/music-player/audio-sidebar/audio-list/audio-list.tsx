import { useEffect, useRef } from "react";
import useSearch from "../../../../api/useSearch/useSearch.ts";

import useCurrentSong from "../../../../zustand/useCurrentSong/useCurrentSong.ts";

import Item from "./item/item.tsx";

function AudioList() {
  const activeAudioRef = useRef<HTMLLIElement>(null);
  const { audioData } = useSearch();
  const currentSongId = useCurrentSong(state => state.currentSongId);

  useEffect(() => {
    activeAudioRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSongId]);

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
