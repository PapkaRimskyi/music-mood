import { useSearchParams } from "react-router-dom"

import useSWR from "swr";
import { fetcher, FetcherArgs } from '../swr-fetcher.ts';

import { ENDPOINTS } from '../endpoints.ts';
import { ISearchResponse } from "../interfaces.ts";

function useSearch() {
  const [searchParams] = useSearchParams();
  const { data, error, isLoading } = useSWR<ISearchResponse, boolean, FetcherArgs | null>({ url: `${ENDPOINTS.SEARCH}`, args: { searchValue: searchParams.get('q') as string } }, fetcher);

  return {
    singerData: data,
    isError: error,
    isLoading,
  };
}

export default useSearch;
