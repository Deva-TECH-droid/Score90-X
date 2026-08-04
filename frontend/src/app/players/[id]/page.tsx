'use client';

import React from 'react';
import { SectionTitle } from '@/components/shared/section-title';
import { ErrorMessage } from '@/components/shared/error-message';
import { usePerson } from '@/hooks/use-person';
import PlayerProfileCard from '@/components/players/PlayerProfileCard';
import PlayerCurrectTeam from '@/components/players/PlayerCurrectTeam';
import PlayerInformation from '@/components/players/PlayerInformation';

interface PlayerDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PlayerDetailsPage({ params }: PlayerDetailsPageProps) {
  const { id } = React.use<{ id: string }>(params);

  const { data: player, isError, isLoading } = usePerson(id);

  if (isError) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <div className="h-72 rounded-3xl bg-slate-800/80" />;
  }

  if (!player) {
    return <ErrorMessage message="Player not found." />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-2 md:p-4 lg:p-5">
      <div className="w-full lg:w-[75%] space-y-2 md:space-y-4">
        <PlayerProfileCard player={player} />
        <PlayerCurrectTeam player={player} />
        <PlayerInformation player={player} />
      </div>
      <div className="w-full lg:w-[25%] lg:sticky lg:top-4 h-fit space-y-2 md:space-y-4"></div>
    </div>
  );
}
