'use client';

import { StandingTable } from '@/components/standings/groupStanding-table';

import { ErrorMessage } from '@/components/shared/error-message';
import { useStandings } from '@/hooks/use-standings';
import { StandingTableSkeleton } from './Groupskeleton';

export default function StandingsPage() {
  const { data, isError, isLoading } = useStandings();

  return (
    <div>
      {isError && <ErrorMessage />}

      {isLoading ? (
        <StandingTableSkeleton />
      ) : (
        <StandingTable entries={data ?? []} />
      )}
    </div>
  );
}