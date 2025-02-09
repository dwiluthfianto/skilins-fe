import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

type AudioFilter = {
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

export function useAudio({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
}: AudioFilter) {
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
    `/contents/audios?${params.toString()}`,
    fetcher
  );

  return {
    audios: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useAudioByStaff({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
  status,
}: AudioFilter) {
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
  if (status) params.append('status', status.toString());

  const { data, error, mutate } = useSWR(
    `/contents/audios/staff?${params.toString()}`,
    fetcher
  );

  return {
    audios: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useAudioBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/audios/${slug}`, fetcher);

  return {
    audio: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useUserAudio(page?: number, limit?: number, status?: string) {
  const { data, error, mutate } = useSWR(
    `/contents/audios/student?page=${page}&limit=${limit}&status=${status}`,
    fetcher
  );

  return {
    audios: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
