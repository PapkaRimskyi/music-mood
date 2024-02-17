import useSearch from "../../api/useSearch/useSearch.ts";
// import useCurrentSongIndex from "../../zustand/createSongIndexSlice.ts";
import useCurrentSong from "../../zustand/useCurrentSong/useCurrentSong.ts";

import MusicCard from "./music-card/music-card.tsx";

import { ISearchResponse } from "../../api/interfaces.ts";

function MusicPlayer() {
  const { singerData, isLoading } = useSearch();
  const currentSongIndex = useCurrentSong(state => state.currentSongIndex);

  return (
    <div>
      {!isLoading && <MusicCard data={(singerData as ISearchResponse).data[currentSongIndex]} />}
    </div>
  );
}

export default MusicPlayer;
