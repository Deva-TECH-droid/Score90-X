'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Trophy, Flag, Users, MapPin } from 'lucide-react';

import { useMatch } from '@/hooks/use-matchDetails';
import { ErrorMessage } from '@/components/shared/error-message';
import { MatchDetails } from '@/components/matches/matchDetails/match-details';
import MatchLiveScoreBanner from '@/components/matches/matchDetails/matchLiveScoreBanner';
import HomeAwayTeamDetails from '@/components/matches/matchDetails/HomeAwayTeamDetails';
import MatchReferees from '@/components/matches/matchDetails/matchReferees';
import VenueCard from '@/components/matches/matchDetails/VenueCard';
import ScoreSummary from '@/components/matches/matchDetails/ScoreSummary';
import MiniGroupOverview from '@/components/OverView.tsx/miniGroupOverview';

interface MatchDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MatchDetailsPage({ params }: MatchDetailsPageProps) {
  const { id } = React.use(params);

  const { data: match, isLoading, isError } = useMatch(id);

  console.log(match);

  if (isLoading) {
    if (isLoading) {
      return (
        <div className="flex flex-col lg:flex-row gap-4 p-2 animate-pulse">
          {/* Main Content */}
          <div className="w-full lg:w-3/4 space-y-3">
            {/* Live Score Banner */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                {/* Home Team */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-5 w-28 rounded bg-slate-800" />
                    <div className="h-4 w-16 rounded bg-slate-800" />
                  </div>
                </div>

                {/* Score */}
                <div className="space-y-3 text-center">
                  <div className="mx-auto h-8 w-24 rounded bg-slate-800" />
                  <div className="mx-auto h-4 w-20 rounded bg-slate-800" />
                </div>

                {/* Away Team */}
                <div className="flex items-center gap-4">
                  <div className="space-y-2 text-right">
                    <div className="h-5 w-28 rounded bg-slate-800" />
                    <div className="ml-auto h-4 w-16 rounded bg-slate-800" />
                  </div>
                  <div className="h-16 w-16 rounded-full bg-slate-800" />
                </div>
              </div>
            </div>

            {/* Match Details */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 h-6 w-40 rounded bg-slate-800" />

              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-950 p-4">
                    <div className="h-10 w-10 rounded-lg bg-slate-800" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-20 rounded bg-slate-800" />
                      <div className="h-5 w-32 rounded bg-slate-800" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Home & Away Details */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 h-6 w-44 rounded bg-slate-800" />

              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((team) => (
                  <div key={team} className="rounded-2xl bg-slate-950 p-5">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-slate-800" />
                      <div className="space-y-2">
                        <div className="h-5 w-28 rounded bg-slate-800" />
                        <div className="h-4 w-16 rounded bg-slate-800" />
                      </div>
                    </div>

                    {[1, 2, 3, 4].map((row) => (
                      <div key={row} className="mb-3 flex justify-between">
                        <div className="h-4 w-24 rounded bg-slate-800" />
                        <div className="h-4 w-10 rounded bg-slate-800" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Venue & Referee */}
            <div className="grid gap-3 md:grid-cols-2">
              {[1, 2].map((card) => (
                <div key={card} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                  <div className="mb-5 h-6 w-32 rounded bg-slate-800" />

                  {[1, 2, 3].map((row) => (
                    <div key={row} className="mb-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-800" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-24 rounded bg-slate-800" />
                        <div className="h-4 w-36 rounded bg-slate-800" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-5 h-6 w-40 rounded bg-slate-800" />

              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="mb-4 flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-slate-800" />
                  <div className="h-4 w-10 rounded bg-slate-800" />
                </div>
              ))}
            </div>
          </aside>
        </div>
      );
    }
  }

  if (!match) {
    return <ErrorMessage message="Match data unavailable" />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-2">
      {/* Main Content */}
      <div className="w-full lg:w-3/4 space-y-2">
        <MatchLiveScoreBanner match={match} />
        <MatchDetails match={match} />
        <HomeAwayTeamDetails match={match} />

        <div className="flex flex-row gap-2">
          <VenueCard venue={match.venue || 'TBA'} />

          <MatchReferees match={match} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 lg:sticky lg:top-2 h-fit">
        <MiniGroupOverview />
      </aside>
    </div>
  );
}
