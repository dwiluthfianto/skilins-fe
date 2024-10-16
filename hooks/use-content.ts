import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useContent(content: string, page: number, limit: number) {
  const { data, error, mutate } = useSWR(
    `/contents/${content}?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    contents: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
export function useContentByCategory(
  content: string,
  category: string,
  page: number,
  limit: number
) {
  const { data, error, mutate } = useSWR(
    `/contents/${content}?category=${category}&page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    contents: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useContentByTag(
  content: string,
  tag: string,
  page: number,
  limit: number
) {
  const { data, error, mutate } = useSWR(
    `/contents/${content}?tag=${tag}&page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    contents: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
