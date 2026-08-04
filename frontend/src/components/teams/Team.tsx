'use client';

import { useEffect, useMemo, useState } from 'react';
import TeamCard from './TeamCard';
import Banner from './banner';
import TeamBanner from '@/public/assets/Images/2026banner.png';
import { Search } from 'lucide-react';
import type { Team } from '@/types';
import MiniTeamSection from '../ui/MiniTeamSection';
import MinNewsUpdates from '../OverView.tsx/minNewsUpdates';
import { LoadingSkeleton } from '../shared/loading-skeleton';

interface Props {
  teams: Team[];
}

function TeamCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 space-y-3">
      <div className="flex items-center gap-3">
        <LoadingSkeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <LoadingSkeleton className="h-3 w-20 rounded-md" />
          <LoadingSkeleton className="h-2 w-14 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function TeamsClient({ teams }: Props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const isSearching = search !== debouncedSearch;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Wait 500ms after typing stops

    return () => clearTimeout(timer);
  }, [search]);

  const filteredTeams = useMemo(() => {
    const query = debouncedSearch.toLowerCase();

    if (!query) return teams;

    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(query) ||
        team.tla?.toLowerCase().includes(query) ||
        team.area?.name?.toLowerCase().includes(query),
    );
  }, [teams, debouncedSearch]);

  const stats = useMemo(() => {
    const totalPlayers = teams.reduce((sum, team) => sum + (team.squad?.length || 0), 0);

    const countries = new Set(teams.map((t) => t.area?.code || t.tla)).size;

    return {
      totalPlayers,
      countries,
      avgPlayers: Math.round(totalPlayers / teams.length),
    };
  }, [teams]);

  return (
    <section className="min-h-screen space-y-2 bg-[#020817] text-white p-4">
      <div className="grid xl:grid-cols-[1fr_320px] gap-2">
        <div className="space-y-2">
          <Banner
            image={TeamBanner}
            title="FIFA World Cup 2026"
            subtitle="Explore all teams competing in FIFA World Cup."
            height="h-[200px]"
          />

          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams..."
              className="w-full rounded-xl border border-slate-800 bg-[#081226] py-3 pl-11 pr-4"
            />
          </div>

          <div className="text-sm text-slate-400">
            {isSearching ? 'Searching...' : `Showing ${filteredTeams.length} teams`}
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
            {isSearching
              ? Array.from({ length: 8 }).map((_, i) => <TeamCardSkeleton key={i} />)
              : filteredTeams.map((team) => <TeamCard key={team.id} team={team} />)}
          </div>
        </div>

        <div className="space-y-2 h-fit sticky top-2.5">
          <div className="bg-[#081226] rounded-2xl p-3 border border-white/10">
            <h3 className="text-sm font-semibold mb-2">Quick Stats</h3>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-slate-950/90 p-4">
                <h4 className="font-bold">{teams.length}</h4>
                <p className="text-xs text-slate-400">Teams</p>
              </div>

              <div className="rounded-xl bg-slate-950/90 p-4">
                <h4 className="font-bold">{stats.countries}</h4>
                <p className="text-xs text-slate-400">Countries</p>
              </div>
            </div>

            <div className="mt-2 rounded-xl bg-slate-950/90 p-4">
              <div className="flex justify-between text-xs">
                <span>Total Players</span>
                <span>{stats.totalPlayers}</span>
              </div>

              <div className="flex justify-between text-xs mt-2">
                <span>Avg Squad Size</span>
                <span>{stats.avgPlayers}</span>
              </div>
            </div>
          </div>

          <MiniTeamSection />
          <MinNewsUpdates />
        </div>
      </div>
    </section>
  );
}