import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

type BlogFilter = {
  page: number;
  limit: number;
  search?: string;
  tag?: string;
  latest?: boolean;
};

export function useBlog({ page, limit, search, tag, latest }: BlogFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append('search', search);
  if (tag) params.append('tag', tag);
  if (latest) params.append('latest', latest.toString());

  const { data, error, mutate } = useSWR(
    `/contents/blogs?${params.toString()}`,
    fetcher
  );

  return {
    blogs: data?.data,
    last_page: data?.pagination.last_page || 1,
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
