import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

type StoryFilter = {
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

export function useStory({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
}: StoryFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (tag) params.append("tag", tag);
  if (genre) params.append("genre", genre);
  if (type) params.append("type", type);
  if (latest) params.append("latest", latest.toString());

  const { data, error, mutate } = useSWR(
    `/contents/stories?${params.toString()}`,
    fetcher
  );

  return {
    stories: data?.data,
    last_page: data?.pagination.last_page,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStoryInfinite(filter?: Partial<StoryFilter>) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;

    const params = new URLSearchParams({
      page: (pageIndex + 1).toString(),
      limit: "12",
    });

    if (filter?.search) params.append("search", filter.search);
    if (filter?.category) params.append("category", filter.category);
    if (filter?.tag) params.append("tag", filter.tag);
    if (filter?.genre) params.append("genre", filter.genre);
    if (filter?.type) params.append("type", filter.type);
    if (filter?.latest) params.append("latest", filter.latest.toString());

    return `/contents/stories?${params.toString()}`;
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const stories = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.pagination?.page >=
        data[data.length - 1]?.pagination?.last_page);

  return {
    stories,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}

export function useStoryByStaff({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
  status,
}: StoryFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (tag) params.append("tag", tag);
  if (genre) params.append("genre", genre);
  if (type) params.append("type", type);
  if (latest) params.append("latest", latest.toString());
  if (status) params.append("status", status);

  const { data, error, mutate } = useSWR(
    `/contents/stories/staff?${params.toString()}`,
    fetcher
  );

  return {
    stories: data?.data,
    last_page: data?.pagination.last_page,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStoryBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/stories/${slug}`, fetcher);

  return {
    story: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStoryEpisode(slug: string, order: string) {
  const { data, error, mutate } = useSWR(
    `/contents/stories/episode/${slug}?order=${order}`,
    fetcher
  );

  return {
    story: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStoryByStudent(filter?: Partial<StoryFilter>) {
  const params = new URLSearchParams({
    page: filter?.page?.toString() || "1",
    limit: filter?.limit?.toString() || "12",
  });

  if (filter?.status) params.append("status", filter.status);
  if (filter?.search) params.append("search", filter.search);
  if (filter?.category) params.append("category", filter.category);
  if (filter?.tag) params.append("tag", filter.tag);
  if (filter?.genre) params.append("genre", filter.genre);
  if (filter?.type) params.append("type", filter.type);
  if (filter?.latest) params.append("latest", filter.latest.toString());

  const { data, error, mutate } = useSWR(
    `/contents/stories/student?${params.toString()}`,
    fetcher
  );

  return {
    stories: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStorySummaryByStaff() {
  const { data, error, mutate } = useSWR(
    `/contents/stories/summary-staff`,
    fetcher
  );

  return {
    summary: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useStorySummaryByStudent() {
  const { data, error, mutate } = useSWR(
    `/contents/stories/summary-student`,
    fetcher
  );

  return {
    summary: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
