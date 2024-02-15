import axios from "axios";

export type TOptionalValues = {
  searchValue?: string,
  id?: number,
}

export type FetcherArgs = { url: string, args: TOptionalValues };

export const fetcher = ({ url, args }: FetcherArgs) => {
  const { searchValue, id } = args;
  const modifiedUrl = id ? `${url}/${id}` : url;

  return axios.get(modifiedUrl, { params: { q: searchValue } })
    .then((res) => res.data);
}
