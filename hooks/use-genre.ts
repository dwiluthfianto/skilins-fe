import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useGenre() {
  const { data, error, mutate } = useSWR(`/genres`, fetcher);

  const autocompleteTags = data?.data?.map(
    (genre: { id: string; text: string }) => ({
      id: genre.id,
      text: genre.text,
    })
  );

  return {
    genres: data?.data,
    autocompleteTags,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useGenreByName(name: string) {
  const { data, error, mutate } = useSWR(`/genres/${name}`, fetcher);

  return {
    genre: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
