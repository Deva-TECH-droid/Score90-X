import { useQuery } from '@tanstack/react-query';
import { worldcupApi } from '@/services/worldcup';
import type { Match } from '@/types';

export function useMatches() {
  return useQuery<Match[]>({
    queryKey: ['matches'],
    queryFn: worldcupApi.getMatches,
    // Cache settings
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: (failureCount, error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status;

      if (status === 429) {
        return false;
      }

      return failureCount < 1;
    },
    retryDelay: 1000,
  });
}
