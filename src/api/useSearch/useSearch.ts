import useSWRMutation from "swr/mutation";

import fetcher from '../swr-fetcher.ts';

import { ENDPOINTS } from '../endpoints.ts';

function useSearch() {
  const { data, error, trigger, isMutating } = useSWRMutation(`${ENDPOINTS.SEARCH}`, fetcher);

  return {
    singerData: data,
    isError: error,
    isMutating,
    trigger,
  };
}

export default useSearch;
