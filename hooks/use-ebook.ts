import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

type EbookFilter = {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  tag?: string;
  genre?: string;
  type?: string;
  latest?: boolean;
};

export function useEbook({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
}: EbookFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  if (tag) params.append('tag', tag);
  if (genre) params.append('genre', genre);
  if (type) params.append('type', type);
  if (latest) params.append('latest', latest.toString());

  const { data, error, mutate } = useSWR(
    `/contents/ebooks?${params.toString()}`,
    fetcher
  );

  return {
    ebooks: data?.data,
    last_page: data?.pagination.last_page,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useEbookBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/ebooks/${slug}`, fetcher);

  return {
    ebook: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
