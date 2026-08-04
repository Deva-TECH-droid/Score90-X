'use client';

import { ROUTES } from '@/constants/routes';
import { ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { Team } from '@/types';
import { useTeams } from '@/hooks/use-teams';

export default function MiniTeamSection() {
  const { data: teams = [], isLoading } = useTeams();

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-navy-blue shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <div>
            <h3 className="text-lg font-medium text-white">Featured Teams</h3>
            <p className="text-sm text-slate-400">FIFA World Cup 2026 Participants</p>
          </div>
        </div>
        <div className="space-y-2 p-2 h-[200px]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-2xl border border-slate-800 bg-slate-800/50 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="  rounded-3xl border border-slate-800 bg-navy-blue shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h3 className="text-lg font-medium text-white">Featured Teams</h3>
          <p className="text-sm text-slate-400">FIFA World Cup 2026 Participants</p>
        </div>

        <Link
          href={ROUTES.teams}
          className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition"
        >
          View
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 gap-2 h-[200px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {teams.slice(0, 8).map((team: Team) => (
          <Link
            key={team.id}
            href={`/teams/${team.id}`}
            className="
              group
              flex items-center gap-1
              rounded-2xl
              border border-slate-800
              bg-slate-900/60
              p-2
              transition-all duration-300
              hover:border-blue-500/50
              hover:bg-slate-800
              hover:translate-x-1
            "
          >
            {/* Team Crest */}
            <div className="flex items-center justify-center rounded-full bg-slate-800">
              <img
                src={team.crest}
                alt={team.name}
                className="h-8 w-8 object-cover flex items-center justify-center rounded-full bg-slate-800"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Team Info */}
            <div className="flex-1 overflow-hidden">
              <h4 className="truncate text-sm font-semibold text-white">{team.name}</h4>

              <p className="text-sm text-slate-500">{team.tla}</p>
            </div>

            {/* Arrow */}
            <ArrowRight
              size={16}
              className="
                text-slate-500
                transition-transform
                group-hover:translate-x-1
                group-hover:text-blue-400
              "
            />
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-2">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-500/10 py-2 text-sm text-blue-400">
          <Shield size={16} />
          <span>{teams.length} Teams Available</span>
        </div>
      </div>
    </div>
  );
}
