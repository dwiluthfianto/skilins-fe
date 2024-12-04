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

export function useMajorSearch(searchValue: string) {
  const { data, error, mutate } = useSWR(
    searchValue ? `/majors?search=${searchValue}` : "/majors",
    fetcher
  );

  const autocompleteMajor = data?.data?.map((major: { name: string }) => ({
    label: major.name,
    value: major.name,
  }));

  return {
    categories: autocompleteMajor,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
