import useSWR from "swr";
import fetcher from '../api.ts';

function useSearch(inputValue: string) {
  const { data, error, isLoading } = useSWR(inputValue, fetcher);

  return {
    singerData: data,
    isError: error,
    isLoading,
  };
}

export default useSearch;
