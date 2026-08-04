'use client';

import Image from 'next/image';
import { BracketMatch } from '@/types/bracket';
import { CalendarDays, Clock3, Trophy } from 'lucide-react';

interface FinalCardProps {
  match?: BracketMatch;
}

function TeamBlock({
  team,
  score,
  penaltyScore,
  isWinner,
  align,
}: {
  team?: { crest: string; name: string; tla?: string } | null;
  score: number | null;
  penaltyScore?: number | null;
  isWinner: boolean;
  align: 'left' | 'right';
}) {
  return (
    <div className={`flex flex-1 items-center gap-3 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      {team ? (
        <Image
          src={team.crest}
          alt={team.name}
          width={40}
          height={40}
          unoptimized
          className="flex-shrink-0 drop-shadow-[0_0_10px_rgba(212,160,23,0.15)]"
        />
      ) : (
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/5 border border-white/10" />
      )}
      <div className="min-w-0">
        <p
          className={`truncate font-[family-name:var(--font-bebas)] text-lg tracking-wide ${
            isWinner ? 'text-amber-400' : 'text-slate-300'
          }`}
        >
          {team ? team.name : 'TBD'}
        </p>
        <p className="text-2xl font-bold text-white leading-none mt-1">
          {score ?? '-'}
          {penaltyScore != null && (
            <span className="ml-1 text-xs font-medium text-slate-500">({penaltyScore})</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default function FinalCard({ match }: FinalCardProps) {
  if (!match) {
    return (
      <div className="w-80 rounded-3xl border border-white/10 bg-gradient-to-b from-[#1a1408] to-[#0a0d1a] shadow-xl">
        <div className="p-8 text-center">
          <Trophy className="mx-auto mb-3 text-amber-500/50" size={28} />
          <p className="font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-amber-500/70">
            FINAL
          </p>
          <div className="mt-8 space-y-3">
            <div className="h-10 rounded-lg bg-white/5 animate-pulse" />
            <div className="h-10 rounded-lg bg-white/5 animate-pulse" />
          </div>
          <div className="mt-8 text-sm text-slate-500">Awaiting finalists</div>
        </div>
      </div>
    );
  }

  const date = new Date(match.utcDate);
  const score = match.score;
  const wentToPenalties = score?.duration === 'PENALTY_SHOOTOUT';

  const homeScore = wentToPenalties
    ? (score.extraTime?.home ?? score.regularTime?.home ?? score.fullTime.home)
    : score.fullTime.home;
  const awayScore = wentToPenalties
    ? (score.extraTime?.away ?? score.regularTime?.away ?? score.fullTime.away)
    : score.fullTime.away;

  const homePen = score.penalties?.home ?? null;
  const awayPen = score.penalties?.away ?? null;

  const homeWins = score.winner === 'HOME_TEAM';
  const awayWins = score.winner === 'AWAY_TEAM';

  const isLive = match.status === 'IN_PLAY' || match.status === 'PAUSED';
  const isFinished = match.status === 'FINISHED';

  return (
    <div className="relative w-80 overflow-hidden rounded-3xl border  border-slate-800 bg-[#131A2C]">


      {/* Header */}
      <div className="relative border-b border-white/10 px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <Trophy size={20} className=" " />
          <h2 className=" text-2xl tracking-[0.15em]  ">
            FINAL
          </h2>
        </div>
      </div>

      {/* Date / time */}
      <div className="relative flex items-center justify-center gap-4 pt-4 text-xs text-slate-400">
        <span className="flex text-sm items-center gap-1.5">
          <CalendarDays size={16} />
          {date.toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
        </span>
        <span className="h-1 w-1 rounded-full bg-slate-600" />
        <span className="flex text-sm items-center gap-1.5">
          <Clock3 size={16} />
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Teams */}
      <div className="relative flex items-center gap-3 px-6 py-6">
        <TeamBlock
          team={match.homeTeam}
          score={homeScore}
          penaltyScore={wentToPenalties ? homePen : null}
          isWinner={homeWins}
          align="left"
        />
        <span className="flex-shrink-0 font-[family-name:var(--font-bebas)] text-sm text-slate-600">
          VS
        </span>
        <TeamBlock
          team={match.awayTeam}
          score={awayScore}
          penaltyScore={wentToPenalties ? awayPen : null}
          isWinner={awayWins}
          align="right"
        />
      </div>

      {/* Status */}
      <div className="relative border-t border-white/10 px-6 py-3">
        <div
          className={`flex items-center justify-center gap-1.5 rounded-full py-1.5 text-center text-xs font-semibold tracking-wide ${
            isFinished
              ? 'bg-emerald-500/10 text-emerald-400'
              : isLive
                ? 'bg-red-500/10 text-red-400'
                : 'bg-blue-500/10 text-blue-400'
          }`}
        >
          {isLive && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />}
          {isFinished ? (wentToPenalties ? 'FT (PENALTIES)' : 'FULL TIME') : match.status}
        </div>
      </div>
    </div>
  );
}