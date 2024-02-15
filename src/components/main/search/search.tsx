import useSearch from "../../../api/useSearch/useSearch.ts";

import SearchInput from "../search-input/search-input.tsx";
import MusicPlayer from "../../music-player/music-player.tsx";

function Search() {
  const { singerData, isMutating, trigger } = useSearch();

  return (
    <div className="mt-8">
      <SearchInput trigger={trigger} isMutating={isMutating} />
      {singerData?.data && <MusicPlayer results={singerData.data} />}
    </div>
  );
}

export default Search;
