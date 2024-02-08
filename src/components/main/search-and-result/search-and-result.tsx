import SearchInput from "../search-input/search-input.tsx";
import ResultList from "../result-list/result-list.tsx";

import useSearch from "../../../api/useSearch/useSearch.ts";

function SearchAndResult() {
  const { singerData, isMutating, trigger } = useSearch();

  return (
    <div className="mt-8">
      <SearchInput trigger={trigger} isMutating={isMutating} />
      {singerData?.data && <ResultList results={singerData.data} />}
    </div>
  );
}

export default SearchAndResult;
