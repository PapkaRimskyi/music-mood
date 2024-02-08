import useSWRMutation from "swr/mutation";

import { fetcher, TOptionalValues } from '../swr-fetcher.ts';

import { ENDPOINTS } from '../endpoints.ts';
import { ISearchResponse } from "../interfaces.ts";

function useSearch() {
  const { data, error, trigger, isMutating } = useSWRMutation<ISearchResponse, boolean, string, TOptionalValues>(`${ENDPOINTS.SEARCH}`, fetcher);

  return {
    singerData: data,
    isError: error,
    isMutating,
    trigger,
  };
}

export default useSearch;
