import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export function useTag() {
  const { data, error, mutate } = useSWR(`/tags`, fetcher);

  const autocompleteTags = data?.data?.map(
    (tag: { id: string; text: string }) => ({
      id: tag.id,
      text: tag.text,
    })
  );

  return {
    tags: data?.data,
    autocompleteTags,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useTagByName(name: string) {
  const { data, error, mutate } = useSWR(`/tags/${name}`, fetcher);

  return {
    tag: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
