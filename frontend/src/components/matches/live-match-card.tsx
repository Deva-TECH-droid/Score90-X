import type { Match } from '@/types';
import MatchCountdown from '../ui/CountDown';
import Link from 'next/link';

interface LiveMatchCardProps {
  match: Match;
}

export function LiveMatchCard({ match }: LiveMatchCardProps) {
  const homeScore = match.score?.fullTime?.home ?? '-';
  const awayScore = match.score?.fullTime?.away ?? '-';

  return (
    <Link href={`matches/${match.id}`} className="rounded-3xl border border-slate-800 bg-[#081226] p-5 transition hover:border-blue-500">
      {/* Status */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            match.status === 'IN_PLAY'
              ? 'bg-red-500/20 text-red-400'
              : match.status === 'FINISHED'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
          }`}
        >
          {match.status}
        </span>

        <span className="text-xs text-slate-400">
          {new Date(match.utcDate).toLocaleDateString()}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between">
        {/* Home */}
        <div className="flex flex-col items-center gap-2 w-[35%]">
          <img
            src={match.homeTeam.crest}
            alt={match.homeTeam.name}
            className="h-12 w-12 object-contain"
          />
          <p className="text-center text-sm font-medium text-white">
            {match.homeTeam.name}
          </p>
        </div>

        {/* Score */}
        <div className="text-center">
          <div className="text-3xl font-bold text-white">
            {homeScore} - {awayScore}
          </div>

          <div className="mt-2 text-xs text-slate-400">
            {new Date(match.utcDate).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-2 w-[35%]">
          <img
            src={match.awayTeam.crest}
            alt={match.awayTeam.name}
            className="h-12 w-12 object-contain"
          />
          <p className="text-center text-sm font-medium text-white">
            {match.awayTeam.name}
          </p>
        </div>
      </div>
        <MatchCountdown kickOff={match.utcDate} />

      {/* Winner */}
      {match.status === 'FINISHED' && (
        <div className="mt-4 border-t border-slate-800 pt-3 text-center text-sm text-slate-400">
          Winner:{' '}
          <span className="font-semibold text-green-400">
            {match.score.winner === 'HOME_TEAM'
              ? match.homeTeam.name
              : match.score.winner === 'AWAY_TEAM'
                ? match.awayTeam.name
                : 'Draw'}
          </span>
        </div>
      )}
    </Link>
  );
}