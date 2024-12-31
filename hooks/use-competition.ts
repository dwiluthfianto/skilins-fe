import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

export function useCompetition(page?: number, limit?: number, search?: string) {
  const { data, error, mutate } = useSWR(
    page && limit
      ? `/competitions?search=${search}&page=${page}&limit=${limit}`
      : `/competitions`,
    fetcher
  );

  return {
    competitions: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useCompetitionBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/competitions/${slug}`, fetcher);

  return {
    competition: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useCompetitionDetail(
  slug: string,
  type: string,
  status: string
) {
  const { data, error, mutate } = useSWR(
    `/competitions/detail/${slug}?type=${type}&status=${status}`,
    fetcher
  );

  return {
    competition: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
