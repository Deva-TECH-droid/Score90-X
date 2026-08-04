import { useQuery } from '@tanstack/react-query';
import { worldcupApi } from '@/services/worldcup';
import type { Person } from '@/types';

export function usePerson(personId: string) {
  return useQuery<Person>({
    queryKey: ['person', personId],
    queryFn: () => worldcupApi.getPersonById(personId),
    enabled: Boolean(personId),
    // Cache settings
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: (failureCount, error: unknown) => {
      const status = (error as { response?: { status?: number } })?.response?.status;

      if (status === 429) {
        return failureCount < 2;
      }

      return failureCount < 1;
    },
    retryDelay: 1000,
  });
}
