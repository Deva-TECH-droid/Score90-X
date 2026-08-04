import { StandingGroup } from '@/types';
import Link from 'next/link';
import { useMemo } from 'react';

interface StandingTableProps {
  entries: StandingGroup[];
}

export function TableStanding({ entries }: StandingTableProps) {
  const overallStandings = useMemo(() => {
    return entries
      .flatMap((group) => group.table)
      .sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }

        if (b.goalDifference !== a.goalDifference) {
          return b.goalDifference - a.goalDifference;
        }

        return b.goalsFor - a.goalsFor;
      });
  }, [entries]);
  return (
    <div className="  flex flex-col gap-4 ">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-white">FIFA World Cup 2026 Rankings</h2>

        <p className="text-slate-400 mt-1">Overall tournament standings</p>
      </div>

      <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="sticky top-0 z-30 bg-slate-950">
              <tr>
                <th className="bg-slate-950 px-4 py-4 text-left">#</th>
                <th className="sticky left-0 z-40 bg-slate-950 px-4 py-4 text-left">Team</th>
                <th className="px-3 py-4 text-center">P</th>
                <th className="px-3 py-4 text-center">W</th>
                <th className="px-3 py-4 text-center">D</th>
                <th className="px-3 py-4 text-center">L</th>
                <th className="px-3 py-4 text-center">GF</th>
                <th className="px-3 py-4 text-center">GA</th>
                <th className="px-3 py-4 text-center">GD</th>
                <th className="px-3 py-4 text-center">PTS</th>
              </tr>
            </thead>

            <tbody className='bg-slate-900'>
              {overallStandings.map((team, index) => (
                <tr
                  key={team.team.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >
                  <td className="  px-4 py-4 bg-slate-900 w-16">
                    <span
                      className={`font-bold ${index < 8 ? 'text-green-400' : 'text-slate-300'}`}
                    >
                      {index + 1}
                    </span>
                  </td>

                  <td className="sticky left-0 px-4 w-[150px]  bg-slate-900 ">
                   <Link
    href={`/teams/${team.team.id}`}
    className="flex items-center gap-2 sm:gap-3"
  >
    <img
      src={team.team.crest}
      alt={team.team.name}
      className="h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8"
    />

    <div className="min-w-0">
      {/* Desktop */}
      <p className="hidden truncate font-medium text-white text-sm   hover:underline sm:block">
        {team.team.name}
      </p>

      {/* Mobile */}
      <p className="block text-sm font-semibold text-white sm:hidden">
        {team.team.tla}
      </p>

      {/* Desktop subtitle */}
      <p className="hidden text-sm text-slate-500 sm:block">
        {team.team.tla}
      </p>
    </div>
  </Link>
                  </td>

                  <td className="text-center text-slate-300">{team.playedGames}</td>

                  <td className="text-center text-slate-300">{team.won}</td>

                  <td className="text-center text-slate-300">{team.draw}</td>

                  <td className="text-center text-slate-300">{team.lost}</td>

                  <td className="text-center text-slate-300">{team.goalsFor}</td>

                  <td className="text-center text-slate-300">{team.goalsAgainst}</td>

                  <td className="text-center text-slate-300">
                    {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                  </td>

                  <td className="text-center font-bold text-indigo-400">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
