import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useAudio() {
  const { data, error, mutate } = useSWR(`/contents/audios`, fetcher);

  return {
    audios: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
