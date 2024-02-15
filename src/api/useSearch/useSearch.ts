import useSWR from "swr";

import { fetcher, FetcherArgs } from '../swr-fetcher.ts';

import { ENDPOINTS } from '../endpoints.ts';
import { ISearchResponse } from "../interfaces.ts";

function useSearch(searchValue: string | null) {
  const { data, error, isLoading } = useSWR<ISearchResponse, boolean, FetcherArgs | null>(searchValue ? { url: `${ENDPOINTS.SEARCH}`, args: { searchValue } } : null, fetcher);

  return {
    singerData: data,
    firstSingerData: data?.data[0],
    isError: error,
    isLoading,
  };
}

export default useSearch;
