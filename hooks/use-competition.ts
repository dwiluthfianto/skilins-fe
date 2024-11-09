import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useCompetition() {
  const { data, error, mutate } = useSWR(`/competitions`, fetcher);

  return {
    competitions: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
