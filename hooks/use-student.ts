import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useStudent() {
  const { data, error, mutate } = useSWR(`/students`, fetcher);

  return {
    student: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
