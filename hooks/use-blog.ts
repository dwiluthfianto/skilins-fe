import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useBlog(page: number) {
  const { data, error, mutate } = useSWR(
    `/contents/blogs?page=${page}&limit=25`,
    fetcher
  );

  return {
    blogs: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useBlogBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/blogs/${slug}`, fetcher);

  return {
    blog: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
