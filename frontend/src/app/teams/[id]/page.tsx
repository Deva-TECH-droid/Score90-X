'use client';
import { SectionTitle } from '@/components/shared/section-title';
import { useTeam } from '@/hooks/use-team';
import { ErrorMessage } from '@/components/shared/error-message';
import Image from 'next/image';
import React from 'react';
import SingleTeam from '@/components/teams/SingleTeam/TeamProfileBanner';
import TeamInfo from '@/components/teams/SingleTeam/TeamInfo';
import TeamPlayers from '@/components/teams/SingleTeam/TeamPlayers';
import CoachCard from '@/components/teams/SingleTeam/CoachCard';

interface TeamDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// type Team = {
//   crest?: string;

//   name?: string;
//   shortName?: string;
//   tla?: string;
//   area?: { name?: string } | null;
//   coach?: { name?: string } | null;
//   founded?: number | string;
//   website?: string;
//   address?: string;

// };

export default function TeamDetailsPage({ params }: TeamDetailsPageProps) {
  const { id } = React.use(params);
  const { data: team, isError, isLoading } = useTeam(id);
  console.log('team ID ' + id);

  if (isError) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return (
      <div className="m-2 flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-3 animate-pulse">
        {/* Main Content */}
        <div className="w-full space-y-2 lg:w-[75%]">
          {/* Team Banner */}
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
            <div className="h-40 bg-slate-800" />

            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center">
              <div className="h-24 w-24 rounded-full bg-slate-800" />

              <div className="flex-1 space-y-3">
                <div className="h-8 w-64 rounded bg-slate-800" />
                <div className="h-5 w-40 rounded bg-slate-800" />

                <div className="flex gap-3 pt-2">
                  <div className="h-8 w-20 rounded-full bg-slate-800" />
                  <div className="h-8 w-20 rounded-full bg-slate-800" />
                  <div className="h-8 w-20 rounded-full bg-slate-800" />
                </div>
              </div>
            </div>
          </div>

          {/* Coach Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6 h-6 w-40 rounded bg-slate-800" />

            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-slate-800" />

              <div className="flex-1 space-y-3">
                <div className="h-6 w-48 rounded bg-slate-800" />
                <div className="h-4 w-28 rounded bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Players */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 p-5">
              <div className="h-6 w-44 rounded bg-slate-800" />
            </div>

            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-slate-800 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-800" />

                  <div className="space-y-2">
                    <div className="h-5 w-36 rounded bg-slate-800" />
                    <div className="h-4 w-24 rounded bg-slate-800" />
                  </div>
                </div>

                <div className="hidden gap-8 md:flex">
                  <div className="h-4 w-12 rounded bg-slate-800" />
                  <div className="h-4 w-16 rounded bg-slate-800" />
                  <div className="h-4 w-10 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[25%] lg:max-w-[320px]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6 h-6 w-36 rounded bg-slate-800" />

            {[...Array(7)].map((_, index) => (
              <div key={index} className="mb-5 flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-slate-800" />
                <div className="h-4 w-20 rounded bg-slate-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!team) {
    return <ErrorMessage message="Team not found." />;
  }

  return (
    <div className="    ">
      {isLoading ? (
        <div className="h-72 rounded-3xl bg-slate-800/80" />
      ) : (
        <div className="m-2 flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-3">
          <div className="w-full space-y-2 lg:w-[75%]">
            <SingleTeam team={team} />
            <CoachCard coach={team.coach} />

            <TeamPlayers team={team} />
          </div>
          <div className="top-2.5 h-fit w-full space-y-2 lg:sticky lg:w-[25%] lg:max-w-[320px]">
            <TeamInfo team={team} />
          </div>
        </div>
      )}
    </div>
  );
}
