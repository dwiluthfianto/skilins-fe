import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useReport(page: number) {
  const { data, error, mutate } = useSWR(
    `/contents/reports?page=${page}&limit=25`,
    fetcher
  );

  return {
    reports: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useReportLatest(page: number, limit: number, week: number) {
  const { data, error, mutate } = useSWR(
    `/contents/reports/latest?page=${page}&limit=${limit}&week=${week}`,
    fetcher
  );

  return {
    reports: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
