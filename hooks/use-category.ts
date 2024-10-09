import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useCategory() {
  const { data, error, mutate } = useSWR(`/categories`, fetcher);

  return {
    categories: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
