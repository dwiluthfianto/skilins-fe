import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

type StoryFilter = {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  tag?: string;
  genre?: string;
  type?: string;
  latest?: boolean;
  status?: string;
};

export function useStory({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
}: StoryFilter) {
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
    `/contents/stories?${params.toString()}`,
    fetcher
  );

  return {
    stories: data?.data,
    last_page: data?.pagination.last_page,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStoryByStaff({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
  status,
}: StoryFilter) {
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
  if (status) params.append('status', status);

  const { data, error, mutate } = useSWR(
    `/contents/stories/staff?${params.toString()}`,
    fetcher
  );

  return {
    stories: data?.data,
    last_page: data?.pagination.last_page,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStoryBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/stories/${slug}`, fetcher);

  return {
    story: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStoryEpisode(slug: string, order: string) {
  const { data, error, mutate } = useSWR(
    `/contents/stories/episode/${slug}?order=${order}`,
    fetcher
  );

  return {
    story: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useUserStory(page?: number, limit?: number, status?: string) {
  const { data, error, mutate } = useSWR(
    `/contents/stories/student?page=${page}&limit=${limit}&status=${status}`,
    fetcher
  );

  return {
    stories: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
