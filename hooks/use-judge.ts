import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useJudge(page?: number, limit?: number, search?: string) {
  const { data, error, mutate } = useSWR(
    page && limit
      ? `/judges?search=${search}&page=${page}&limit=${limit}`
      : `/judges`,
    fetcher
  );

  const autocompleteJudges = data?.data?.map(
    (judge: { uuid: string; full_name: string }) => ({
      id: judge.uuid,
      text: judge.full_name,
    })
  );

  return {
    judges: data?.data,
    autocompleteJudges,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
