import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useAudio(page: number) {
  const { data, error, mutate } = useSWR(
    `/contents/audios?page=${page}&limit=25`,
    fetcher
  );

  return {
    audios: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
