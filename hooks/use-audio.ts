import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useAudio(page?: number, limit?: number, search?: string) {
  const { data, error, mutate } = useSWR(
    page && limit
      ? `/contents/audios?page=${page}&limit=${limit}&search=${search}`
      : `/contents/audios`,
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

export function useAudioLatest(
  page: number,
  limit: number,
  week: number,
  status: string
) {
  const { data, error, mutate } = useSWR(
    `/contents/audios/latest?page=${page}&limit=${limit}&week=${week}&status=${status}`,
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
