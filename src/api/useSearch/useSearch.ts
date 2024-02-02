import useSWRMutation from "swr/mutation";

import { fetcher, TOptionalValues } from '../swr-fetcher.ts';

import { ENDPOINTS } from '../endpoints.ts';
import { ISearch } from "../interfaces.ts";

function useSearch() {
  const { data, error, trigger, isMutating } = useSWRMutation<ISearch[], boolean, string, TOptionalValues>(`${ENDPOINTS.SEARCH}`, fetcher);

  return {
    singerData: data,
    isError: error,
    isMutating,
    trigger,
  };
}

export default useSearch;
