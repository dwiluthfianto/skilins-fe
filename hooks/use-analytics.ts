import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useAnalyticsUser() {
  const { data, error, mutate } = useSWR(`/analytics/user-stats`, fetcher);

  return {
    userAnalytics: data?.data,
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
    contentStats: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useFeedbackStats() {
  const { data, error, mutate } = useSWR("/analytics/feedback-stats", fetcher);

  return {
    feedbackStats: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useAnalyticsPklReportStats() {
  const { data, error, mutate } = useSWR(`/analytics/pkl-reports`, fetcher);

  return {
    pklReportStats: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useAnalyticsContentStats() {
  const { data, error, mutate } = useSWR(`/analytics/content-stats`, fetcher);

  return {
    contentStats: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
