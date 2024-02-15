import { useSearchParams } from "react-router-dom";

import useSearch from "../../api/useSearch/useSearch.ts";

import MusicCard from "./music-card/music-card.tsx";

import { ISearch } from "../../api/interfaces.ts";

function MusicPlayer() {
  const [searchParams] = useSearchParams();
  const { singerData, firstSingerData, isError, isLoading } = useSearch(searchParams.get('q'));

  return (
    <div>
      {!isLoading && <MusicCard data={firstSingerData as ISearch} />}
    </div>
  );
}

export default MusicPlayer;
