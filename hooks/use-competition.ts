import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

type CompetitionFilter = {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  status?: boolean;
};

export function useCompetition({
  page,
  limit,
  search,
  type,
  status,
}: CompetitionFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) params.append('search', search);
  if (type) params.append('type', type);
  if (status) params.append('status', status.toString());

  const { data, error, mutate } = useSWR(
    `/competitions?${params.toString()}`,
    fetcher
  );

  return {
    competitions: data?.data,
    last_page: data?.pagination.last_page || 1,
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
