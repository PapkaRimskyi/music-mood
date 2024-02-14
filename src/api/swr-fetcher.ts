import axios from "axios";

export type TOptionalValues = {
  searchValue?: string,
  id?: number,
}

export type TOptionalArg = { arg: TOptionalValues };

export const fetcher = (url: string, { arg }: TOptionalArg) => {
  const { searchValue, id } = arg;
  const modifiedUrl = id ? `${url}/${id}` : url;

  return axios.get(modifiedUrl, { params: { q: searchValue } })
    .then((res) => res.data);
}
