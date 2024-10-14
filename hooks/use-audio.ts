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

export function useAudioLatest(page: number, limit: number, week: number) {
  const { data, error, mutate } = useSWR(
    `/contents/audios/latest?page=${page}&limit=${limit}&week=${week}`,
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
