import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useReport() {
  const { data, error, mutate } = useSWR(`/contents/reports`, fetcher);

  return {
    reports: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
