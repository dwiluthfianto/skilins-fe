import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useReport(page?: number, limit?: number, search?: string) {
  const { data, error, mutate } = useSWR(
    page && limit
      ? `/contents/prakerin?page=${page}&limit=${limit}&search=${search}`
      : `/contents/prakerin`,
    fetcher
  );

  return {
    prakerin: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useReportLatest(
  page: number,
  limit: number,
  week: number,
  status: string
) {
  const { data, error, mutate } = useSWR(
    `/contents/prakerin/latest?page=${page}&limit=${limit}&week=${week}&status=${status}`,
    fetcher
  );

  return {
    prakerin: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useReportBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/prakerin/${slug}`, fetcher);

  return {
    audio: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useUserReport(page?: number, limit?: number) {
  const { data, error, mutate } = useSWR(
    `/contents/prakerin/student?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    prakerin: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
