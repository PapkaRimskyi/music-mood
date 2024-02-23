import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import useSWRInfinite from "swr/infinite";

import { fetcher } from '../swr-fetcher.ts';

import useZustandStore from "@zustand/zustandStore.ts";

import swrOptions from "@src/api/swr-api/useSearch/settings.ts";

import { ENDPOINTS } from '@src/api/endpoints.ts';
import { ISearch, ISearchResponse } from "@src/api/interfaces.ts";

function useSearch() {
  const [searchParams] = useSearchParams();

  const searchParamsString = searchParams.toString();

  const { data, error, isLoading, setSize, size, isValidating } = useSWRInfinite(getKey, fetcher, { ...swrOptions, onSuccess: onSuccessSwrRequest });

  const modifiedAudioData = useMemo(() => {
    if (!data) {
      return data;
    }
    const concatedAudioData = data.reduce((prev, current) => prev.concat(current.data), [] as ISearch[]);
    return {
      data: concatedAudioData,
      next: data[data.length - 1].next,
      total: data[data.length - 1].total,
    }
  }, [data]);

  const changeCurrentSong = useZustandStore(state => state.changeCurrentSong);
  const currentSongId = useZustandStore(state => state.currentSongId);
  const shuffledList = useZustandStore(state => state.shuffledList);

  function getKey(pageIndex: number, previousPageData: ISearchResponse | null) {
    const nextSongIndex = new URLSearchParams(previousPageData?.next).get('index');

    if (previousPageData && !previousPageData.next) return null;

    if (pageIndex === 0) return `${ENDPOINTS.SEARCH}?${searchParamsString}`;

    return `${ENDPOINTS.SEARCH}?${searchParamsString}&index=${nextSongIndex}`;
  }

  function onSuccessSwrRequest(resData: ISearchResponse[]) {
    if (!currentSongId) {
      changeCurrentSong(Number(resData[0].data[0].id));
    }
  }

  return {
    audioData: shuffledList || modifiedAudioData?.data || [],
    total: modifiedAudioData?.total || 0,
    next: modifiedAudioData?.next,
    isError: error,
    isLoading,
    isValidating,
    setSize,
    size,
  };
}

export default useSearch;
