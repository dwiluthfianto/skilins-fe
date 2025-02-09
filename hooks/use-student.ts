import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';

type StudentFilter = {
  page: number;
  limit: number;
  nis?: string;
  name?: string;
  major?: string;
  status?: boolean;
};

export function useStudent({
  page,
  limit,
  nis,
  name,
  major,
  status,
}: StudentFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (nis) params.append('nis', nis);
  if (name) params.append('name', name);
  if (major) params.append('major', major);
  if (status) params.append('status', status.toString());
  const { data, error, mutate } = useSWR(
    `/students?${params.toString()}`,
    fetcher
  );

  return {
    student: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
