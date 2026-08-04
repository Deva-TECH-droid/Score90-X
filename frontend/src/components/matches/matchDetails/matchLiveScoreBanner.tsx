import MatchCountdown from '@/components/ui/CountDown';
import Image from 'next/image';

interface MatchDetailsProps {
  match: any;
}
export default function MatchLiveScoreBanner({ match }: MatchDetailsProps) {
  const matchDate = new Date(match.utcDate);

  const formattedDate = matchDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = matchDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const statusConfig = {
    TIMED: {
      label: 'Scheduled',
      className: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
    },
    IN_PLAY: {
      label: 'Live',
      className: 'bg-red-500/15 text-red-400 border border-red-500/20 animate-pulse',
    },
    PAUSED: {
      label: 'Half Time',
      className: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    },
    FINISHED: {
      label: 'Full Time',
      className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    },
    POSTPONED: {
      label: 'Postponed',
      className: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
    },
    CANCELLED: {
      label: 'Cancelled',
      className: 'bg-slate-500/15 text-slate-400 border border-slate-500/20',
    },
    SUSPENDED: {
      label: 'Suspended',
      className: 'bg-purple-500/15 text-purple-400 border border-purple-500/20',
    },
    AWARDED: {
      label: 'Awarded',
      className: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/20',
    },
  } as const;
  const currentStatus = statusConfig[match.status as keyof typeof statusConfig];

  console.log(match);
  const score = match.score ?? {};

  const isPenaltyShootout = score.duration === 'PENALTY_SHOOTOUT';

  const displayHomeScore = isPenaltyShootout ? score.regularTime?.home : score.fullTime?.home;

  const displayAwayScore = isPenaltyShootout ? score.regularTime?.away : score.fullTime?.away;

  const hasScore =
    displayHomeScore !== null &&
    displayHomeScore !== undefined &&
    displayAwayScore !== null &&
    displayAwayScore !== undefined;
  return (
    <div className="overflow-hidden match-details-hero rounded-2xl border border-slate-800 bg-[#081226] shadow-lg">
      <div className="px-4 py-6 sm:px-6 lg:px-8 backdrop-blur-[4px]">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 rounded-full bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400 w-fit mx-auto">
          <span>{match.stage?.replaceAll('_', ' ') ?? 'TBA'}</span>
          <span>•</span>
          <span>{match.group?.replaceAll('_', ' ') ?? 'TBA'}</span>
          <span>•</span>
          <span>Match Day {match.matchday}</span>
        </div>

        <div className="flex justify-between sm:justify-center items-center sm:gap-10">
          {/* HOME */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={match.homeTeam.crest}
              alt={match.homeTeam.name}
              width={120}
              height={120}
              className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain"
              unoptimized
            />

            <h2 className="mt-4 text-lg sm:text-xl lg:text-2xl font-bold text-white">
              {match.homeTeam.name}
            </h2>

            <p className="mt-1 text-sm font-medium text-white/70">{match.homeTeam.tla}</p>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div>
              <p className="text-lg text-slate-300 font-medium">{formattedDate}</p>

              <h2 className="mt-1 text-lg font-medium text-slate-300">{formattedTime}</h2>
            </div>
            {hasScore ? (
              <div className="flex items-start justify-center gap-4">
                {/* Home */}
                <div className="flex items-start">
                  <span className="text-5xl sm:text-6xl font-extrabold text-white leading-none">
                    {displayHomeScore}
                  </span>

                  {isPenaltyShootout && (
                    <span className="-mt-2 ml-2 text-xl sm:text-2xl font-bold text-sky-300">
                      ({score.penalties?.home})
                    </span>
                  )}
                </div>

                <span className="text-5xl sm:text-6xl font-extrabold text-slate-500 leading-none">
                  :
                </span>

                {/* Away */}
                <div className="flex items-start">
                  <span className="text-5xl sm:text-6xl font-extrabold text-white leading-none">
                    {displayAwayScore}
                  </span>

                  {isPenaltyShootout && (
                    <span className="-mt-2 ml-2 text-xl sm:text-2xl font-bold text-sky-300">
                      ({score.penalties?.away})
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-bold text-white">VS</h1>
            )}

            <span
              className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${currentStatus?.className}`}
            >
              {currentStatus?.label || match.status}
            </span>

            {match.status === 'TIMED' && (
              <div className="opacity-80 text-sm">
                <MatchCountdown kickOff={match.utcDate} />
              </div>
            )}
          </div>

          {/* AWAY */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={match.awayTeam.crest}
              alt={match.awayTeam.name}
              width={120}
              height={120}
              className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain"
              unoptimized
            />

            <h2 className="mt-4 text-lg sm:text-xl lg:text-2xl font-bold text-white">
              {match.awayTeam.name}
            </h2>

            <p className="mt-1 text-sm font-medium text-white/70">{match.awayTeam.tla}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
