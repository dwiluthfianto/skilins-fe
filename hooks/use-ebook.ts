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

export function useEbookLatest() {
  const { data, error, mutate } = useSWR(`/contents/ebooks/latest`, fetcher);

  return {
    ebooks: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
