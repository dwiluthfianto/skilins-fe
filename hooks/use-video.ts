import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useVideo(page: number) {
  const { data, error, mutate } = useSWR(
    `/contents/videos?page=${page}&limit=25`,
    fetcher
  );

  return {
    videos: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useVideoLatest(page: number, limit: number, week: number) {
  const { data, error, mutate } = useSWR(
    `/contents/videos/latest?page=${page}&limit=${limit}&week=${week}`,
    fetcher
  );

  return {
    videos: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
