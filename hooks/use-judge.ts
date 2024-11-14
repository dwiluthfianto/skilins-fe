import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useJudge(page: number, limit: number, search: string) {
  const { data, error, mutate } = useSWR(
    `/judges?search=${search}&page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    judges: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
