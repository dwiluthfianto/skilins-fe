import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

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

  if (search) params.append("search", search);
  if (type) params.append("type", type);
  if (status) params.append("status", status.toString());

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

export function useCompetitionInfinite(filter?: Partial<CompetitionFilter>) {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;

    const params = new URLSearchParams({
      page: (pageIndex + 1).toString(),
      limit: "12",
    });

    if (filter?.search) params.append("search", filter.search);
    if (filter?.type) params.append("type", filter.type);
    if (filter?.status) params.append("status", filter.status.toString());

    return `/competitions?${params.toString()}`;
  };

  const { data, error, size, setSize, isLoading, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );

  const competitions = data ? [].concat(...data.map((page) => page.data)) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.pagination?.page >=
        data[data.length - 1]?.pagination?.last_page);

  return {
    competitions,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
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
