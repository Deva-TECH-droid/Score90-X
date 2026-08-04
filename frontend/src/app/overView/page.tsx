'use client';

import LiveNowBanner from '@/components/OverView.tsx/LiveNowBanner';
import LiveMatchesMIniOverView from '@/components/OverView.tsx/liveMatchesMIniOverView';
import MiniGroupOverview from '@/components/OverView.tsx/miniGroupOverview';
import MiniTeamSection from '@/components/ui/MiniTeamSection';
import MinNewsUpdates from '@/components/OverView.tsx/minNewsUpdates';
import { useMatches } from '@/hooks/use-matches';
import { useTopScorers } from '@/hooks/use-top-scorers'; // <-- new hook, fetches TopScorer[]
import TopScorersWidget from '@/components/OverView.tsx/TopScorersWidget';

function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-800/60 relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />
    </div>
  );
}

function OverViewSkeleton() {
  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-[1800px] space-y-2 p-5">
        <section className="grid gap-2 lg:grid-cols-[2fr_380px]">
          {/* Left column */}
          <div className="flex flex-col space-y-2">
            {/* Live Now Banner skeleton */}
            <div className="rounded-2xl border border-slate-800 bg-navy-blue p-4 space-y-3">
              <Skeleton className="h-4 w-24" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-14" />
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>

            {/* Live Matches Mini Overview skeleton */}
            <div className="rounded-xl border border-slate-800 bg-navy-blue p-2 space-y-2">
              {/* Tabs + date picker row */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-8 w-32" />
              </div>

              {/* Match rows */}
              <div className="space-y-1 mt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-700/20 px-3 py-3"
                  >
                    <div className="space-y-1 min-w-fit">
                      <Skeleton className="h-3 w-14" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                    <Skeleton className="h-6 w-12 mx-4" />
                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <Skeleton className="h-3 w-10" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer button */}
              <div className="flex justify-center mt-2">
                <Skeleton className="h-8 w-40" />
              </div>
            </div>
          </div>

          {/* Right column - Team section */}
          <div className="space-y-2">
            <div className="rounded-2xl border border-slate-800 bg-navy-blue p-4 space-y-3 h-full">
              <Skeleton className="h-4 w-28" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-2 lg:grid-cols-[1.3fr_1fr]">
          {/* Group overview skeleton */}
          <div className="rounded-2xl border border-slate-800 bg-navy-blue p-4 space-y-3">
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2 rounded-xl border border-slate-700/20 p-3">
                  <Skeleton className="h-3 w-16" />
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* News updates skeleton */}
          <div className="rounded-2xl border border-slate-800 bg-navy-blue p-4 space-y-3">
            <Skeleton className="h-4 w-28" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-16 w-16 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function OverViewClient() {
  const { data: matches = [], isLoading: matchesLoading, isError: matchesError } = useMatches();
  const { data: scorers = [], isLoading: scorersLoading, isError: scorersError } = useTopScorers();

  if (matchesLoading || scorersLoading) {
    return <OverViewSkeleton />;
  }

  if (matchesError || scorersError) {
    return (
      <div className="rounded-3xl border border-red-500/40 bg-red-950/30 p-6 text-red-200">
        Failed to load matches.
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-[1800px] space-y-2 p-5">
        <section className="grid gap-2 lg:grid-cols-[2fr_380px]">
          <div className="flex flex-col space-y-2">
            <LiveNowBanner data={matches} />
            <LiveMatchesMIniOverView data={matches} />
          </div>

          <div className="space-y-2">
            <MiniTeamSection />
            <TopScorersWidget scorers={scorers} />
          </div>
        </section>

        <section className="grid gap-2 lg:grid-cols-[1.3fr_1fr]">
          <MiniGroupOverview />
          <MinNewsUpdates />
        </section>
      </div>
    </main>
  );
}