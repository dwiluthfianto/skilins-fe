import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useNovel() {
  const { data, error, mutate } = useSWR(`/contents/novels`, fetcher);

  return {
    novels: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
