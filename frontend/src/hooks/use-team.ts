import { useQuery } from '@tanstack/react-query';
import { worldcupApi } from '@/services/worldcup';
import type { Team } from '@/types';

export function useTeam(teamId: string) {
  return useQuery<Team>({
    queryKey: ['team', teamId],
    queryFn: () => worldcupApi.getTeamById(teamId),
    enabled: Boolean(teamId),
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
