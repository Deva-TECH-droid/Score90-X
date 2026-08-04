import { useQuery } from '@tanstack/react-query';
import { worldcupApi } from '@/services/worldcup';
import type { Team } from '@/types';

export function useTeams() {
  return useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: worldcupApi.getTeams,
      // Cache settings
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
}
