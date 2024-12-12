import { QueryClient } from '@tanstack/react-query';

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 5 * (60 * 1000),
        refetchInterval: 6 * (60 * 1000),
      },
    },
  });
}

export const queryClient = generateQueryClient();
