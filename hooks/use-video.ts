import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useVideo() {
  const { data, error, mutate } = useSWR(`/contents/videos`, fetcher);

  return {
    videos: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
