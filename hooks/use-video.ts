import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

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

export function useVideoInfinite() {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;

    if (pageIndex === 0) return `/contents/videos?page=1&limit=12`;

    return `/contents/videos?page=${pageIndex + 1}&limit=12`;
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const videos = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.pagination?.page >=
        data[data.length - 1]?.pagination?.last_page);

  return {
    videos,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
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

export function useVideoByStudent({
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
    `/contents/videos/student?${params.toString()}`,
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
