'use client';

import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { BracketMatch, BracketTeam } from '@/types/bracket';

function formatDate(utcDate: string): string {
  return new Date(utcDate).toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
}

function statusLabel(match: BracketMatch): { label: string; tone: 'live' | 'done' | 'upcoming' } {
  const hasPenalties = match.score?.penalties?.home != null;

  if (match.status === 'FINISHED') {
    return { label: hasPenalties ? 'FT (P)' : 'FT', tone: 'done' };
  }
  if (match.status === 'IN_PLAY' || match.status === 'PAUSED') {
    return { label: 'LIVE', tone: 'live' };
  }
  return {
    label: new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    tone: 'upcoming',
  };
}

function TeamRow({
  team,
  score,
  penaltyScore,
  isWinner,
  isDecided,
}: {
  team?: BracketTeam | null;
  score: number | null;
  penaltyScore?: number | null;
  isWinner: boolean;
  isDecided: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-2.5 min-w-0">
        {team ? (
          <Image
            src={team.crest}
            alt={team.name}
            width={20}
            height={20}
            unoptimized
            className="  flex-shrink-0"
          />
        ) : (
          <div className="h-5 w-5 flex-shrink-0 rounded-sm bg-slate-700" />
        )}
        <span
          className={`truncate text-[15px] ${
            isWinner ? 'font-semibold text-white' : 'text-slate-400'
          }`}
        >
          {team ? team.name : 'TBD'}
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className={`text-[15px] ${isWinner ? 'font-semibold text-white' : 'text-slate-400'}`}>
          {score ?? '-'}
          {isDecided && penaltyScore != null && (
            <span className="ml-1 text-xs text-slate-500">({penaltyScore})</span>
          )}
        </span>
        {isWinner && <ChevronLeft size={14} className="  absolute  -right-[1px]" />}
      </div>
    </div>
  );
}

export default function BracketMatchCard({ match }: { match: BracketMatch }) {
  const homeScore = match.score?.fullTime?.home ?? null;
  const awayScore = match.score?.fullTime?.away ?? null;
  const homePen = match.score?.penalties?.home ?? null;
  const awayPen = match.score?.penalties?.away ?? null;

  const isFinished = match.status === 'FINISHED';
  const hasPenalties = homePen != null && awayPen != null;

  const homeWins =
    isFinished && (hasPenalties ? homePen! > awayPen! : (homeScore ?? 0) > (awayScore ?? 0));
  const awayWins =
    isFinished && (hasPenalties ? awayPen! > homePen! : (awayScore ?? 0) > (homeScore ?? 0));

  const { label, tone } = statusLabel(match);

  return (
    <div className="w-full h-full rounded-2xl border border-slate-800 bg-[#131A2C] px-4 py-3 shadow-sm relative">
      {/* Header: date + status */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-200">{formatDate(match.utcDate)}</span>
        <span
          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
            tone === 'live'
              ? 'bg-red-500/15 text-red-400'
              : tone === 'done'
                ? 'bg-slate-700/60 text-slate-300'
                : 'bg-blue-500/15 text-blue-400'
          }`}
        >
          {label}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-800 mb-1" />

      <TeamRow
        team={match.homeTeam}
        score={homeScore}
        penaltyScore={homePen}
        isWinner={homeWins}
        isDecided={isFinished}
      />
      <TeamRow
        team={match.awayTeam}
        score={awayScore}
        penaltyScore={awayPen}
        isWinner={awayWins}
        isDecided={isFinished}
      />
    </div>
  );
}
