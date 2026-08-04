'use client';

import MiniGroupOverview from '@/components/OverView.tsx/miniGroupOverview';
import TopScorerCard from '@/components/topScores/TopScoresCard';
import MiniTeamSection from '@/components/ui/MiniTeamSection';
import { useTopScorers } from '@/hooks/use-top-scorers';

export default function TopScorers() {
  const { data, isLoading, isError } = useTopScorers();

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-4 p-2 md:p-4 lg:p-5 animate-pulse">
        {/* Main Content */}
        <div className="w-full lg:w-[75%]">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"
              >
                {/* Image */}
                <div className="h-40 bg-slate-800" />

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="h-5 w-2/3 rounded bg-slate-800" />
                  <div className="h-4 w-1/2 rounded bg-slate-800" />

                  <div className="flex justify-between pt-2">
                    <div className="h-8 w-16 rounded bg-slate-800" />
                    <div className="h-8 w-8 rounded-full bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[25%] space-y-4">
          {/* Mini Group Overview */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="h-6 w-40 rounded bg-slate-800 mb-5" />

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between mb-4"
              >
                <div className="h-4 w-24 rounded bg-slate-800" />
                <div className="h-4 w-10 rounded bg-slate-800" />
              </div>
            ))}
          </div>

          {/* Mini Team Section */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="h-6 w-32 rounded bg-slate-800 mb-5" />

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 mb-4"
              >
                <div className="h-10 w-10 rounded-full bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-800" />
                  <div className="h-3 w-1/2 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load scorers.</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-2 md:p-4 lg:p-5">
      {/* Main Content */}
      <div className="w-full lg:w-[75%]">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {data?.map((scorer, index) => (
            <TopScorerCard
              key={scorer.player.id}
              scorer={scorer}
              rank={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-[25%] lg:sticky lg:top-4 h-fit space-y-4">
        <MiniGroupOverview />
        <MiniTeamSection />
      </div>
    </div>
  );
}