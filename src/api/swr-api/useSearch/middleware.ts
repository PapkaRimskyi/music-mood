import { Middleware, SWRHook } from "swr";

import { ISearch, ISearchResponse } from "@src/api/interfaces.ts";

const concatSongDataIntoOneArrMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
  const swr = useSWRNext(key, fetcher, config);

  const swrData = swr.data as ISearchResponse[] | undefined;
  const concatedAudioData = swrData?.reduce((prev, current) => prev.concat(current.data), [] as ISearch[]) || [];
  const lastArrCol = swrData ? swrData[swrData.length - 1] : null;
  const newData = {
    data: {
      data: concatedAudioData,
      total: lastArrCol?.total || null,
      next: lastArrCol?.next || null,
    },
  }

  return Object.assign({}, swr, newData);
}

export default concatSongDataIntoOneArrMiddleware;
