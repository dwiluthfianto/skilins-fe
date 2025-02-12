import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

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

export function useAudioInfinite() {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;

    if (pageIndex === 0) return `/contents/audios?page=1&limit=12`;

    return `/contents/audios?page=${pageIndex + 1}&limit=12`;
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const audios = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.pagination?.page >=
        data[data.length - 1]?.pagination?.last_page);

  return {
    audios,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
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
