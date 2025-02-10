import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

// Helper function untuk membuat key pagination
const getKey = (pageIndex: number, previousPageData: any) => {
  // Reached the end
  if (previousPageData && !previousPageData.data) return null;

  // First page, we don't have previousPageData
  if (pageIndex === 0) return `/tags?page=1&limit=12`;

  // Add the page number to the URL
  return `/tags?page=${pageIndex + 1}&limit=12`;
};

export function useTag() {
  const {
    data,
    error,
    size,
    setSize,
    isLoading,
    mutate
  } = useSWRInfinite(getKey, fetcher);

  // Gabungkan semua data dari setiap halaman
  const tags = data ? [].concat(...data.map(page => page.data)) : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.pagination?.page >= data[data.length - 1]?.pagination?.last_page);

  const autocompleteTags = tags?.map((tag: { id: string; text: string }) => ({
    id: tag.id,
    text: tag.text,
  }));

  return {
    tags,
    autocompleteTags,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
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
