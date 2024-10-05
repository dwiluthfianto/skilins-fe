import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useMajor() {
  const { data, error, mutate } = useSWR(`/majors`, fetcher);

  return {
    major: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
