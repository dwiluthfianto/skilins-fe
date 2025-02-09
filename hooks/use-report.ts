import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

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
