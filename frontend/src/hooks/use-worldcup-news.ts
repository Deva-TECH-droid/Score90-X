import { useQuery } from '@tanstack/react-query';
import { getWorldCupNews } from '@/lib/wikipedia-news';

export function useWorldCupNews() {
  return useQuery({
    queryKey: ['worldcup-news'],
    queryFn: getWorldCupNews,
      // Cache settings
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
}