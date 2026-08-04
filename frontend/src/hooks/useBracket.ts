import { useQuery } from '@tanstack/react-query';
import { getbracketMatches } from '@/services/bracketService';

export function useBracket() {
  return useQuery({
    queryKey: ['worldcup-bracket'],
    queryFn: getbracketMatches,
    // Cache settings
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
}
