import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

type VideoFilter = {
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

export function useVideo({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
}: VideoFilter) {
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
    `/contents/videos?${params.toString()}`,
    fetcher
  );

  return {
    videos: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useVideoByStaff({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
  status,
}: VideoFilter) {
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
    `/contents/videos/staff?${params.toString()}`,
    fetcher
  );

  return {
    videos: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useVideoBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/videos/${slug}`, fetcher);

  return {
    video: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useUserVideo(page?: number, limit?: number, status?: string) {
  const { data, error, mutate } = useSWR(
    `/contents/videos/student?page=${page}&limit=${limit}&status=${status}`,
    fetcher
  );

  return {
    videos: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
