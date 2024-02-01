import axios from "axios";

const fetcher = (url: string, { arg }: { arg: { searchValue?: string, id?: number } }) => {
  const { searchValue, id } = arg;
  const modifiedUrl = id ? `${url}/${id}` : url;

  return axios.get(modifiedUrl, { params: { q: searchValue } })
    .then((res) => res.data.data);
}

export default fetcher;
