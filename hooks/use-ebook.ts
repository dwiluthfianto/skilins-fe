import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useEbook(page: number) {
  const { data, error, mutate } = useSWR(
    `/contents/ebooks?page=${page}&limit=25`,
    fetcher
  );

  return {
    ebooks: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useEbookLatest(page: number, limit: number, week: number) {
  const { data, error, mutate } = useSWR(
    `/contents/ebooks/latest?page=${page}&limit=${limit}&week=${week}`,
    fetcher
  );

  return {
    ebooks: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
