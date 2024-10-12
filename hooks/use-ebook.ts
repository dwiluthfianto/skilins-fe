import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useEbook() {
  const { data, error, mutate } = useSWR(`/contents/ebooks`, fetcher);

  return {
    ebooks: data?.data,
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
