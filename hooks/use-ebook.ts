import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useEbook(page?: number, limit?: number, search?: string) {
  const { data, error, mutate } = useSWR(
    page && limit
      ? `/contents/ebooks?page=${page}&limit=${limit}&search=${search}`
      : `/contents/ebooks`,
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

export function useEbookLatest(
  page: number,
  limit: number,
  week: number,
  status: string
) {
  const { data, error, mutate } = useSWR(
    `/contents/ebooks/latest?page=${page}&limit=${limit}&week=${week}&status=${status}`,
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

export function useEbookBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/ebooks/${slug}`, fetcher);

  return {
    ebook: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
