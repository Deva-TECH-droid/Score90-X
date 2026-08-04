'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useStandings } from '@/hooks/use-standings';

export default function MiniGroupOverview() {
  const { data, isLoading, error } = useStandings();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
        Loading groups...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5">
        Failed to load groups
      </div>
    );
  }

  const groups = data ?? [];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-navy-blue">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-2">
        <div>
          <h2 className=" text-lg font-medium text-white">Group Standings</h2>

          <p className="text-sm text-slate-400">FIFA World Cup 2026</p>
        </div>

        <Link
          href={ROUTES.standings}
          className="flex items-center gap-2 !text-sm text-blue-400 hover:text-blue-300"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Groups */}
      <div className="flex gap-3 overflow-x-auto p-2 scrollbar-hide">
        {groups.slice(0, 6).map((group) => (
          <div
            key={`${group.stage}-${group.group}`}
            className="
              min-w-[280px]
              rounded-2xl
              border
              border-slate-800
              bg-slate-900/80
              p-2
              transition-all
              duration-300
              hover:border-blue-500/40
              hover:bg-slate-800
            "
          >
            {/* Group Header */}
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
                {group.group}
              </span>
            </div>

            {/* Teams */}
            <div className="space-y-1">
              {group.table.map((entry, index) => (
                <div
                  key={entry.team.id}
                  className={`
                    flex items-center justify-between
                    rounded-xl
                    px-3 py-2
                    transition
                    ${index < 2 ? 'bg-green-500/10' : 'bg-slate-950/50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`
                        w-5 text-center text-sm font-bold
                        ${index < 2 ? 'text-green-400' : 'text-slate-500'}
                      `}
                    >
                      {entry.position}
                    </span>

                    <img
                      src={entry.team.crest}
                      alt={entry.team.name}
                      className="h-7 w-7 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-sm font-medium text-white">{entry.team.tla}</p>

                      <p className="text-sm text-slate-500">{entry.team.name}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-bold text-white text-sm">{entry.points}</p>

                    <p className="text-sm text-slate-500">pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
