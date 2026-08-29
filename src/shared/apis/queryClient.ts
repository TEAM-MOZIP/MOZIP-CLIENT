import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status && status >= 400 && status < 500) return false;
        }
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: 0,
    },
  },
});
