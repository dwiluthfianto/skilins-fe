import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
import Cookies from 'js-cookie';

export const useUser = () => {
  // Cek keberadaan access token
  const hasAccessToken = Boolean(Cookies.get('access_token'));

  const { data, error, mutate } = useSWR(
    // Hanya lakukan fetch jika ada access token
    hasAccessToken ? 'auth/user' : null,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404 || error.status === 401) return;

        // Hentikan retry untuk status 403
        if (error.status === 403) return;

        // Never retry for a specific key.
        if (key === 'auth/user') return;

        if (retryCount >= 2) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  const loggedOut = !hasAccessToken || (error && error.status === 403);

  return {
    user: data,
    isLoading: hasAccessToken && !error && !data,
    loggedOut,
    mutate,
  };
};
