import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

type EbookFilter = {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  tag?: string;
  genre?: string;
  type?: string;
  latest?: boolean;
};

export function useEbook({
  page,
  limit,
  search,
  category,
  tag,
  genre,
  type,
  latest,
}: EbookFilter) {
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
    `/contents/ebooks?${params.toString()}`,
    fetcher
  );

  return {
    ebooks: data?.data,
    last_page: data?.pagination.last_page,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useEbookInfinite(filter?: Partial<EbookFilter>) {
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

    return `/contents/ebooks?${params.toString()}`;
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const ebooks = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.pagination?.page >=
        data[data.length - 1]?.pagination?.last_page);

  return {
    ebooks,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}

export function useEbookBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/ebooks/${slug}`, fetcher);

  return {
    ebook: data?.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
