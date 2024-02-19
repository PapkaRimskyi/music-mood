import { useSearchParams } from "react-router-dom"

import useSWR from "swr";
import { fetcher, FetcherArgs } from '../swr-fetcher.ts';

import useCurrentSong from "../../zustand/useCurrentSong/useCurrentSong.ts";

import { ENDPOINTS } from '../endpoints.ts';
import { ISearchResponse } from "../interfaces.ts";

function useSearch() {
  const [searchParams] = useSearchParams();
  const { changeCurrentSong, currentSongId } = useCurrentSong();
  const { data, error, isLoading } = useSWR<ISearchResponse, boolean, FetcherArgs | null>({ url: `${ENDPOINTS.SEARCH}`, args: { searchValue: searchParams.get('q') as string } }, fetcher, { onSuccess: onSuccessSwrRequest });

  function onSuccessSwrRequest(resData: ISearchResponse) {
    if (!currentSongId) {
      changeCurrentSong(Number(resData.data[0].id));
    }
  }

  return {
    audioData: data?.data || [],
    total: data?.total || 0,
    next: data?.next || '',
    isError: error,
    isLoading,
  };
}

export default useSearch;
