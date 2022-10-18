import useSWR from "swr";
import axios from "axios";

export const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export const useHello = (query: boolean) => {
  const { data, error } = useSWR(query ? `/api/hello` : null, fetcher);

  const hello = data;
  const isLoadingHello = !data && !error;
  const isEmptyHello = data?.length === 0;

  return {
    hello,
    isLoadingHello,
    isEmptyHello,
  };
};
