import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useAnalyticsUser() {
  const { data, error, mutate } = useSWR(`/analytics/user-stats`, fetcher);

  return {
    userAnalytics: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useAnalyticsCountContent() {
  const { data, error, mutate } = useSWR(
    `/analytics/content-type-stats`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useAnalyticsPklReportStats() {
  const { data, error, mutate } = useSWR(`/analytics/pkl-reports`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useAnalyticsContentStats() {
  const { data, error, mutate } = useSWR(`/analytics/content-stats`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
