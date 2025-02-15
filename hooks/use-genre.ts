import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

export function useGenre(search?: string) {
  const getKey = (
    pageIndex: number,
    previousPageData: any,
    search?: string
  ) => {
    if (previousPageData && !previousPageData.data) return null;

    const baseUrl = '/genres';
    const searchParam = search ? `&name=${search}` : '';

    if (pageIndex === 0) return `${baseUrl}?page=1&limit=12${searchParam}`;

    return `${baseUrl}?page=${pageIndex + 1}&limit=12${searchParam}`;
  };

  const { data, error, mutate, size, setSize, isLoading } = useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, search),
    fetcher
  );
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1]?.pagination?.page >=
        data[data.length - 1]?.pagination?.last_page);

  const genres = data ? [].concat(...data.map((page) => page.data)) : [];

  const autocompleteGenres = genres?.map(
    (genre: { uuid: string; name: string }) => ({
      id: genre.uuid,
      text: genre.name,
    })
  );

  return {
    genres,
    autocompleteGenres,
    isLoading: !error && !data,
    isError: error,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
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
