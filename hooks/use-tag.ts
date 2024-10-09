import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useTag() {
  const { data, error, mutate } = useSWR(`/tags`, fetcher);

  return {
    tags: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
