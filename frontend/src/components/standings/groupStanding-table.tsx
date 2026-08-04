import { useEffect, useMemo, useState } from 'react';
import type { Match, StandingGroup } from '@/types';

import { StandingsGuide } from '../OverView.tsx/standingGuide';
import { TournamentInfo } from '../ui/tournamentInfoCard';
import { useMatches } from '@/hooks/use-matches';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface StandingTableProps {
  entries: StandingGroup[];
}

export function StandingTable({ entries }: StandingTableProps) {
  const normalizedEntries = Array.isArray(entries) ? entries : [];
  const stageFilters = useMemo(
    () => Array.from(new Set(normalizedEntries.map((group) => group.stage))),
    [normalizedEntries],
  );
  const defaultStage = stageFilters[0] ?? 'Group Stage';
  const [selectedStage, setSelectedStage] = useState<string>(defaultStage);

  useEffect(() => {
    if (!normalizedEntries.length) {
      return;
    }

    const hasSelectedStage = normalizedEntries.some((group) => group.stage === selectedStage);

    if (!hasSelectedStage) {
      setSelectedStage(defaultStage);
    }
  }, [defaultStage, normalizedEntries, selectedStage]);

  const filteredEntries = useMemo(
    () => normalizedEntries.filter((group) => group.stage === selectedStage),
    [normalizedEntries, selectedStage],
  );

  const { data: match = [] } = useMatches();

  const matchesForStage = useMemo(() => {
    // Backend /matches payload doesn't include round/events/venue; keep standings table safe.
    // If a match already has round (later enhancements), we can filter by stage.
    return match.filter((match: any) => {
      const round = String(match?.round ?? '');
      return round.toLowerCase().includes(String(selectedStage ?? '').toLowerCase());
    });
  }, [match, selectedStage]);

  const standingsStageStats = useMemo(() => {
    const totalPlayedGames = filteredEntries.reduce(
      (groupAcc, group) =>
        groupAcc + group.table.reduce((teamAcc, entry) => teamAcc + entry.playedGames, 0),
      0,
    );

    const totalGoals = filteredEntries.reduce(
      (groupAcc, group) =>
        groupAcc + group.table.reduce((teamAcc, entry) => teamAcc + entry.goalsFor, 0),
      0,
    );

    return {
      matchesPlayed: Math.floor(totalPlayedGames / 2),
      goalsScored: totalGoals,
    };
  }, [filteredEntries]);

  const countCardEvents = (
    events: Match['score'] extends never ? never : any,
    cardRegex: RegExp,
  ) => {
    if (!events || !Array.isArray(events)) return 0;
    return events.reduce(
      (count: number, event: any) =>
        count +
        (cardRegex.test(String(event?.type ?? '')) ||
        cardRegex.test(String(event?.description ?? ''))
          ? 1
          : 0),
      0,
    );
  };

  const matchesPlayed = matchesForStage.length || standingsStageStats.matchesPlayed;
  const goalsScored =
    matchesForStage.length > 0
      ? matchesForStage.reduce(
          (sum, match: any) =>
            sum + (match?.score?.fullTime?.home ?? 0) + (match?.score?.fullTime?.away ?? 0),
          0,
        )
      : standingsStageStats.goalsScored;

  const avgGoalsPerMatch = matchesPlayed > 0 ? Number((goalsScored / matchesPlayed).toFixed(1)) : 0;
  const yellowCards = matchesForStage.reduce(
    (sum, match: any) => sum + countCardEvents(match?.events, /yellow/i),
    0,
  );
  const redCards = matchesForStage.reduce(
    (sum, match: any) => sum + countCardEvents(match?.events, /red/i),
    0,
  );

  if (!normalizedEntries.length) {
    return <div className="  p-8 text-center text-slate-400">No standings available yet.</div>;
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-2 p-3.5">
      <div className="">
        <h3 className="text-2xl font-bold">Group Standing</h3>
        <p>FIFA World Cup 2026 </p>
        <div className="py-4 flex flex-wrap gap-3">
          {stageFilters.map((stage) => (
            <button
              key={stage}
              type="button"
              onClick={() => setSelectedStage(stage)}
              className={`px-4 py-2 rounded-[14px] border ${
                selectedStage === stage
                  ? 'border-white bg-white/10 text-white'
                  : 'border-[#8080804f] text-slate-300'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {filteredEntries.length ? (
          <div className="grid grid-cols-1 gap-2 pt-4 md:grid-cols-2 2xl:grid-cols-3">
            {filteredEntries.map((group) => (
              <div
                key={`${group.stage}-${group.group}`}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
              >
                <div className="border-b border-slate-800 bg-slate-950/90 px-6 py-4">
                  <div className="flex   gap-2   justify-between">
                    <p className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">{group.group}</p>
                    <a className="text-sm flex align-middle items-center    gap-1  text-indigo-500">
                      View Group <ArrowRight size={13} />
                    </a>
                  </div>
                </div>

                <table className="min-w-full border-collapse text-xs">
                  <thead className="bg-slate-950/90 text-left text-slate-400 text-sm">
                    <tr>
                      <th className="px-3 py-3 text-left">Team</th>

                      <th className="w-10 px-2 py-3 text-center">P</th>
                      <th className="w-10 px-2 py-3 text-center">W</th>
                      <th className="w-10 px-2 py-3 text-center">D</th>
                      <th className="w-10 px-2 py-3 text-center">L</th>
                      <th className="w-12 px-2 py-3 text-center">GD</th>
                      <th className="w-12 px-2 py-3 text-center">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {group.table.map((entry, index) => (
                      <tr
                        key={entry.team.id}
                        className={`border-t border-slate-800 hover:bg-slate-950/70   ${index < 2 ? 'bg-green-500/10' : 'bg-slate-950/50'}`}
                      >
                        <td className="px-2 py-3   text-slate-300">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{entry.position}.</span>
                            <img
                              src={entry.team.crest}
                              alt={`${entry.team.name} crest`}
                          className="h-7 w-7 shrink-0 rounded-full object-cover"
                              onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement;
                                img.style.display = 'none';
                              }}
                            />
                            <Link href={`/teams/${entry.team.id}`} className="min-w-0">


                              <span className="text-sm underline text-white font-medium">{entry.team.tla}</span>
                            </Link>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-center text-slate-300">{entry.playedGames}</td>
                        <td className="px-2 py-3 text-center text-slate-300">{entry.won}</td>
                        <td className="px-2 py-3 text-center text-slate-300">{entry.draw}</td>
                        <td className="px-2 py-3 text-center text-slate-300">{entry.lost}</td>
                        <td className="px-2 py-3 text-center text-slate-300">{entry.goalDifference}</td>
                        <td className="px-4 py-4 font-semibold text-white">{entry.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-400">
            No standings available for {selectedStage}.
          </div>
        )}
      </div>
      <div className="space-y-2 h-fit top-2.5 sticky md:w-[25%]">
        <StandingsGuide />
        <TournamentInfo
          matchesPlayed={matchesPlayed}
          goalsScored={goalsScored}
          avgGoalsPerMatch={avgGoalsPerMatch}
          yellowCards={yellowCards}
          redCards={redCards}
        />
      </div>
    </div>
  );
}
