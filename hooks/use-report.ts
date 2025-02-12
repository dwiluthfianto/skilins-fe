import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

type PrakerinFilter = {
  page: number;
  limit: number;
  search?: string;
  latest?: boolean;
  status?: string;
};

export function useReport({ page, limit, search, latest }: PrakerinFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append('search', search);
  if (latest) params.append('latest', latest.toString());

  const { data, error, mutate } = useSWR(
    `/contents/prakerin?${params.toString()}`,
    fetcher
  );

  return {
    prakerin: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useReportInfinite() {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;

    if (pageIndex === 0) return `/contents/prakerin?page=1&limit=12`;

    return `/contents/prakerin?page=${pageIndex + 1}&limit=12`;
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const prakerin = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.pagination?.page >=
        data[data.length - 1]?.pagination?.last_page);

  return {
    prakerin,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}

export function useReportByStaff({
  page,
  limit,
  search,
  latest,
  status,
}: PrakerinFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append('search', search);
  if (latest) params.append('latest', latest.toString());
  if (status) params.append('status', status.toString());

  const { data, error, mutate } = useSWR(
    `/contents/prakerin/staff?${params.toString()}`,
    fetcher
  );

  return {
    prakerin: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useReportBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/prakerin/${slug}`, fetcher);

  return {
    prakerin: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useUserReport(page?: number, limit?: number) {
  const { data, error, mutate } = useSWR(
    `/contents/prakerin/student?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    prakerin: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
