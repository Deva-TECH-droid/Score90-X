'use client';

import MiniGroupOverview from '@/components/OverView.tsx/miniGroupOverview';
import MinNewsUpdates from '@/components/OverView.tsx/minNewsUpdates';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';
import StandingColumnInfo from '@/components/standings/StandingColumnInfo';
import { TableStanding } from '@/components/standings/tableStanding';
import { useStandings } from '@/hooks/use-standings';

function StandingRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800/60">
      <LoadingSkeleton className="h-4 w-4 rounded-md" />
      <LoadingSkeleton className="h-7 w-7 rounded-full" />
      <LoadingSkeleton className="h-3 w-28 rounded-md" />
      <div className="ml-auto flex gap-4">
        <LoadingSkeleton className="h-3 w-6 rounded-md" />
        <LoadingSkeleton className="h-3 w-6 rounded-md" />
        <LoadingSkeleton className="h-3 w-6 rounded-md" />
        <LoadingSkeleton className="h-3 w-6 rounded-md" />
        <LoadingSkeleton className="h-3 w-8 rounded-md" />
      </div>
    </div>
  );
}

function TableStandingSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#081226] overflow-hidden">
      {/* Table header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/40">
        <LoadingSkeleton className="h-3 w-4 rounded-md" />
        <LoadingSkeleton className="h-3 w-20 rounded-md" />
        <div className="ml-auto flex gap-4">
          <LoadingSkeleton className="h-3 w-6 rounded-md" />
          <LoadingSkeleton className="h-3 w-6 rounded-md" />
          <LoadingSkeleton className="h-3 w-6 rounded-md" />
          <LoadingSkeleton className="h-3 w-6 rounded-md" />
          <LoadingSkeleton className="h-3 w-8 rounded-md" />
        </div>
      </div>

      {/* Rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <StandingRowSkeleton key={i} />
      ))}
    </div>
  );
}

function TableStandingPageSkeleton() {
  return (
    <div className="w-full p-3 lg:p-4">
      <div className="flex flex-col xl:flex-row gap-4">
        {/* LEFT */}
        <div className="flex-1 min-w-0 space-y-4">
          <TableStandingSkeleton />
        </div>

        {/* RIGHT */}
        <aside className="w-full xl:w-[360px] shrink-0 space-y-4 xl:sticky xl:top-3 h-fit">
          <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 space-y-3">
            <LoadingSkeleton className="h-4 w-28 rounded-md" />
            <LoadingSkeleton className="h-3 w-full rounded-md" />
            <LoadingSkeleton className="h-3 w-3/4 rounded-md" />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 space-y-3">
            <LoadingSkeleton className="h-4 w-32 rounded-md" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingSkeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 space-y-3">
            <LoadingSkeleton className="h-4 w-24 rounded-md" />
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

export default function TableStandingPage() {
  const { data, isLoading, isError } = useStandings();

  if (isLoading) {
    return <TableStandingPageSkeleton />;
  }

  if (isError) {
    return <div className="text-red-500">Failed to load standings</div>;
  }

  return (
    <div className="w-full p-3 lg:p-4">
      <div className="flex flex-col xl:flex-row gap-4">
        {/* LEFT */}
        <div className="flex-1 min-w-0">
          <TableStanding entries={data ?? []} />
        </div>

        {/* RIGHT */}
        <aside className="w-full xl:w-[360px] shrink-0 space-y-4 xl:sticky xl:top-3 h-fit">
          <StandingColumnInfo />

          <MiniGroupOverview />

          <MinNewsUpdates />
        </aside>
      </div>
    </div>
  );
}