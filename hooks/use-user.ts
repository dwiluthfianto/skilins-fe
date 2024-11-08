import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useUser = () => {
  const { data, error, mutate } = useSWR("auth/user", fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404 || error.status === 401) return;

      // Hentikan retry untuk status 403
      if (error.status === 403) return;

      // Never retry for a specific key.
      if (key === "auth/user") return;

      if (retryCount >= 2) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  const loggedOut = error && error.status === 403;

  return {
    user: data,
    isLoading: !error && !data,
    loggedOut,
    mutate,
  };
};
