'use client';

import Image from 'next/image';

export interface MatchDetailsProps {
  match: any;
}

export default function ScoreSummary({ match }: MatchDetailsProps) {
  const score = match?.score ?? {};

  const isKnockout =
    score.duration === 'EXTRA_TIME' ||
    score.duration === 'PENALTY_SHOOTOUT';

  const halfTime = score.halfTime ?? {
    home: null,
    away: null,
  };

  const regularTime = score.regularTime ?? score.fullTime ?? {
    home: null,
    away: null,
  };

  const extraTime = score.extraTime ?? {
    home: null,
    away: null,
  };

  const penalties = score.penalties ?? {
    home: null,
    away: null,
  };

  const fullTime = score.fullTime ?? {
    home: null,
    away: null,
  };

  const secondHalfHome =
    regularTime.home != null && halfTime.home != null
      ? regularTime.home - halfTime.home
      : '-';

  const secondHalfAway =
    regularTime.away != null && halfTime.away != null
      ? regularTime.away - halfTime.away
      : '-';

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-navy-blue">

      {/* Header */}
      <div
        className={`grid ${
          isKnockout
            ? 'grid-cols-[1fr_50px_50px_50px_50px_50px]'
            : 'grid-cols-[1fr_50px_50px_50px]'
        } border-b border-slate-800 px-5 py-3 text-[11px] uppercase tracking-wider text-slate-500`}
      >
        <span className="text-sm font-medium text-white">
          Score Summary
        </span>

        <span className="text-center">1st</span>
        <span className="text-center">2nd</span>

        {isKnockout && (
          <>
            <span className="text-center">ET</span>
            <span className="text-center">Pens</span>
          </>
        )}

        <span className="text-center">FT</span>
      </div>

      {/* Home */}
      <div
        className={`grid ${
          isKnockout
            ? 'grid-cols-[1fr_50px_50px_50px_50px_50px]'
            : 'grid-cols-[1fr_50px_50px_50px]'
        } items-center border-b border-slate-800 px-5 py-4`}
      >
        <div className="flex items-center gap-3">
          <Image
            src={match.homeTeam.crest}
            alt={match.homeTeam.name}
            width={24}
            height={24}
            unoptimized
          />

          <div>
            <p className="font-medium text-white">
              {match.homeTeam.name}
            </p>

            <p className="text-sm text-white/70">
              {match.homeTeam.tla}
            </p>
          </div>
        </div>

        <div className="text-center">{halfTime.home ?? '-'}</div>

        <div className="text-center">{secondHalfHome}</div>

        {isKnockout && (
          <>
            <div className="text-center">
              {extraTime.home ?? '-'}
            </div>

            <div className="text-center">
              {penalties.home ?? '-'}
            </div>
          </>
        )}

        <div className="text-center font-bold text-green-400">
          {fullTime.home ?? '-'}
        </div>
      </div>

      {/* Away */}
      <div
        className={`grid ${
          isKnockout
            ? 'grid-cols-[1fr_50px_50px_50px_50px_50px]'
            : 'grid-cols-[1fr_50px_50px_50px]'
        } items-center px-5 py-4`}
      >
        <div className="flex items-center gap-3">
          <Image
            src={match.awayTeam.crest}
            alt={match.awayTeam.name}
            width={24}
            height={24}
            unoptimized
          />

          <div>
            <p className="font-medium text-white">
              {match.awayTeam.name}
            </p>

            <p className="text-sm text-white/70">
              {match.awayTeam.tla}
            </p>
          </div>
        </div>

        <div className="text-center">{halfTime.away ?? '-'}</div>

        <div className="text-center">{secondHalfAway}</div>

        {isKnockout && (
          <>
            <div className="text-center">
              {extraTime.away ?? '-'}
            </div>

            <div className="text-center">
              {penalties.away ?? '-'}
            </div>
          </>
        )}

        <div className="text-center font-bold text-green-400">
          {fullTime.away ?? '-'}
        </div>
      </div>
    </div>
  );
}