import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useNovel(page: number) {
  const { data, error, mutate } = useSWR(
    `/contents/novels?page=${page}&limit=25`,
    fetcher
  );

  return {
    novels: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
