import { useQuery } from '@tanstack/react-query';
import { worldcupApi } from '@/services/worldcup';
import type { Match } from '@/types';
import { MatchDetails } from '@/types/matchDetails';

export function useMatch(matchId: string) {
  return useQuery<MatchDetails>({
    queryKey: ['match', matchId],
    queryFn: () => worldcupApi.getMatchById(matchId),
    enabled: Boolean(matchId),
      // Cache settings
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
}
