import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

export function useStory(page?: number, limit?: number, search?: string) {
  const { data, error, mutate } = useSWR(
    page && limit
      ? `/contents/stories?page=${page}&limit=${limit}&search=${search}`
      : `/contents/stories`,
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

export function useStoryLatest(
  page: number,
  limit: number,
  week: number,
  status: string
) {
  const { data, error, mutate } = useSWR(
    `/contents/stories/latest?page=${page}&limit=${limit}&week=${week}&status=${status}`,
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
    `/contents/stories/episodes/${slug}?order=${order}`,
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
