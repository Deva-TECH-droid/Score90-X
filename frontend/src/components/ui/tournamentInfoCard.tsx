import { ArrowRight } from 'lucide-react';

interface TournamentInfoProps {
  matchesPlayed: number;
  goalsScored: number;
  avgGoalsPerMatch: number;
  yellowCards: number;
  redCards: number;
}

export function TournamentInfo({
  matchesPlayed,
  goalsScored,
  avgGoalsPerMatch,
  yellowCards,
  redCards,
}: TournamentInfoProps) {
  const stats = [
    { label: 'Matches Played', value: matchesPlayed },
    { label: 'Goals Scored', value: goalsScored },
    { label: 'Avg Goals/Match', value: avgGoalsPerMatch },
    { label: 'Yellow Cards', value: yellowCards },
    { label: 'Red Cards', value: redCards },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 shadow-soft backdrop-blur-sm">
      <h3 className="mb-5 text-lg font-medium text-white">
        Tournament Info
      </h3>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-0 last:pb-0"
          >
            <span className="text-sm text-slate-400">
              {stat.label}
            </span>

            <span className="text-sm text-white">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <a className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-1 py-1 text-sm  text-indigo-400 transition-all hover:bg-indigo-500/20 hover:text-indigo-300">
        Full Tournament Stats
        <ArrowRight size={16} />
      </a>
    </div>
  );
}