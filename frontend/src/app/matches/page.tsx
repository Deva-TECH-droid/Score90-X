'use client';

import { useState } from 'react';
import { MatchCard } from '@/components/matches/match-card';
import { useMatches } from '@/hooks/use-matches';
import MiniGroupOverview from '@/components/OverView.tsx/miniGroupOverview';
import MiniTeamSection from '@/components/ui/MiniTeamSection';
import MinNewsUpdates from '@/components/OverView.tsx/minNewsUpdates';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';

function MatchRowSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        <LoadingSkeleton className="h-10 w-10 rounded-full" />
        <LoadingSkeleton className="h-3 w-20 rounded-md" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <LoadingSkeleton className="h-3 w-14 rounded-md" />
        <LoadingSkeleton className="h-6 w-12 rounded-md" />
      </div>

      <div className="flex items-center gap-3 flex-1 justify-end">
        <LoadingSkeleton className="h-3 w-20 rounded-md" />
        <LoadingSkeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}

function MatchesPageSkeleton() {
  return (
    <div className="m-2 lg:m-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Content */}
        <div className="w-full lg:w-[75%] space-y-2">
          {/* Header */}
          <div className="py-5 space-y-3">
            <LoadingSkeleton className="h-7 md:h-9 w-64 md:w-96 rounded-md" />
            <LoadingSkeleton className="h-4 w-72 rounded-md" />
          </div>

          {/* Date Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingSkeleton key={i} className="h-9 w-20 shrink-0 rounded-xl" />
            ))}
          </div>

          {/* Match Count */}
          <LoadingSkeleton className="h-8 w-36 rounded-full" />

          {/* Matches */}
          <div className="grid gap-2 mt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <MatchRowSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[25%] lg:sticky lg:top-4 h-fit space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 space-y-2">
            <LoadingSkeleton className="h-4 w-32 rounded-md" />
            <LoadingSkeleton className="h-3 w-40 rounded-md" />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 space-y-3">
            <LoadingSkeleton className="h-4 w-28 rounded-md" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingSkeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 space-y-3">
            <LoadingSkeleton className="h-4 w-24 rounded-md" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <LoadingSkeleton className="h-8 w-8 rounded-full" />
                <LoadingSkeleton className="h-3 w-24 rounded-md" />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 space-y-3">
            <LoadingSkeleton className="h-4 w-28 rounded-md" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <LoadingSkeleton className="h-14 w-14 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <LoadingSkeleton className="h-3 w-full rounded-md" />
                  <LoadingSkeleton className="h-3 w-2/3 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function Matches() {
  const { data, isError, isLoading } = useMatches();

  const today = new Date().toLocaleDateString('en-CA');

  const [selectedDate, setSelectedDate] = useState(today);

  if (isLoading) {
    return <MatchesPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-500/40 bg-red-950/30 p-6 text-red-200">
        Failed to load matches.
      </div>
    );
  }

  const matches = data || [];
  const dates = Array.from(
    new Set(matches.map((match) => new Date(match.utcDate).toLocaleDateString('en-CA'))),
  ).sort();

  const filteredMatches = matches.filter(
    (match) => new Date(match.utcDate).toLocaleDateString('en-CA') === selectedDate,
  );

  return (
    <div className="m-2 lg:m-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Content */}
        <div className="w-full lg:w-[75%] space-y-2">
          {/* Header */}
          <div className="py-5">
            <h1 className="text-lg md:text-3xl font-bold text-white">
              FIFA World Cup 2026 Fixtures
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-400">
              Browse all scheduled World Cup matches.
            </p>
          </div>

          {/* Date Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {dates.map((date) => {
              const today = new Date().toLocaleDateString('en-CA');

              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`rounded-xl px-4 py-2 !text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedDate === date ? 'bg-blue-600 text-white' : 'bg-[#081226] text-slate-300'
                  }`}
                >
                  {date === 'all'
                    ? 'All Matches'
                    : date === today
                      ? 'Today'
                      : new Date(date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                </button>
              );
            })}
          </div>

          {/* Match Count */}
          <div className="text-sm bg-navy-blue w-fit px-3 py-2 rounded-full text-slate-400">
            Showing {filteredMatches.length} matches
          </div>

          {/* Matches */}
          <div className="grid gap-2">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[25%] lg:sticky lg:top-4 h-fit space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4">
            <h3 className="font-semibold text-white">Tournament Info</h3>
            <p className="mt-2 text-sm text-slate-400">FIFA World Cup 2026</p>
          </div>
          <MiniGroupOverview />
          <MiniTeamSection />
          <MinNewsUpdates />
        </aside>
      </div>
    </div>
  );
}