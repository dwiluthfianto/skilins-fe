import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

type BlogFilter = {
  page: number;
  limit: number;
  search?: string;
  tag?: string;
  latest?: boolean;
};

export function useBlog({ page, limit, search, tag, latest }: BlogFilter) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (search) params.append("search", search);
  if (tag) params.append("tag", tag);
  if (latest) params.append("latest", latest.toString());

  const { data, error, mutate } = useSWR(
    `/contents/blogs?${params.toString()}`,
    fetcher
  );

  return {
    blogs: data?.data,
    last_page: data?.pagination.last_page || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useBlogInfinite(filter?: Partial<BlogFilter>) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;

    const params = new URLSearchParams({
      page: (pageIndex + 1).toString(),
      limit: "12",
    });

    if (filter?.search) params.append("search", filter.search);
    if (filter?.tag) params.append("tag", filter.tag);
    if (filter?.latest) params.append("latest", filter.latest.toString());

    return `/contents/blogs?${params.toString()}`;
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const blogs = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.pagination?.page >=
        data[data.length - 1]?.pagination?.last_page);

  return {
    blogs,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}

export function useBlogBySlug(slug: string) {
  const { data, error, mutate } = useSWR(`/contents/blogs/${slug}`, fetcher);

  return {
    blog: data?.data,
    totalPages: data?.lastPage || 1,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
