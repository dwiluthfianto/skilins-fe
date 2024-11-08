import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useCategory() {
  const { data, error, mutate } = useSWR(`/categories`, fetcher);

  return {
    categories: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useCategorySearch(searchValue: string) {
  const { data, error, mutate } = useSWR(
    searchValue ? `/categories?search=${searchValue}` : "/categories",
    fetcher
  );

  const autocompleteCategory = data?.data?.map(
    (category: { name: string }) => ({
      label: category.name,
      value: category.name,
    })
  );

  return {
    categories: autocompleteCategory,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useCategoryByName(name: string) {
  const { data, error, mutate } = useSWR(`/categories/${name}`, fetcher);

  return {
    category: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
