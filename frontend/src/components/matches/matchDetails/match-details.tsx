import MatchCountdown from '@/components/ui/CountDown';
import { Calendar, Clock, Trophy, Flag, Users, MapPin, ClipboardPen } from 'lucide-react';
import Image from 'next/image';
import ScoreSummary from './ScoreSummary';
interface MatchDetailsProps {
  match: any;
}

export function MatchDetails({ match }: MatchDetailsProps) {
  function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
      <div className="flex items-center justify-between border-b border-slate-800/70 p-2">
        <span className="text-base  text-slate-400">{label}</span>
        <span className="text-base text-white">{value}</span>
      </div>
    );
  }

  const matchDate = new Date(match.utcDate);



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
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* HERO */}


      {/* INFO GRID */}
      <div className="grid gap-2 lg:grid-cols-2">
        {/* MATCH INFO */}
        <div className="rounded-xl border border-slate-800 bg-navy-blue h-[100%]  px-2">
          <h3 className="mb-2 p-2 flex items-center gap-2 text-lg font-medium text-white">
            <div className='flex p-2 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition'>

            <Flag className='' size={17} />
            </div>
            Match Information
          </h3>

          <div className="">
            <InfoRow label="Competition" value={match.competition.name} />
            <InfoRow label="Stage" value={match.stage} />

            <InfoRow label="Group" value={match.group} />

            <InfoRow label="Matchday" value={match.matchday} />

            <InfoRow label="Venue" value={match.venue || 'TBA'} />

            <InfoRow label="Status" value={match.status} />

            <InfoRow label="Last Updated" value={new Date(match.lastUpdated).toLocaleString()} />
          </div>
        </div>

        <div className="rounded-xl space-y-1  ">
          {/* SCORE */}
        <ScoreSummary match={match} />
          <div className="rounded-xl border border-slate-800 bg-navy-blue p-2 h-fit">
            <h3 className=" p-1 flex items-center gap-2 text-lg font-medium text-white">
              <div className='flex p-2 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition'>
              <Trophy size={17} />
              </div>
              Competition Details
            </h3>

            <div className="flex gap-5 ">
              <Image
                src={match.competition.emblem}
                alt={match.competition.name}
                width={90}
                height={90}
                unoptimized
                className="object-cover bg-white rounded-2xl p-2"
              />

              <div className="w-full">
                <h4 className="text-lg  font-medium text-white">{match.competition.name}</h4>

                <div className="text-slate-400  border-b border-slate-800/70 text-base  flex justify-between w-full p-1 ">
                  <p className=" "> Code:</p>
                  <p>{match.competition.code}</p>
                </div>
                <div className="text-slate-400  border-b border-slate-800/70 text-base  flex justify-between w-full p-1 ">
                  <p className=" "> Type:</p>
                  <p> {match.competition.type}</p>
                </div>
                <div className="text-slate-400    text-base  flex justify-between w-full p-1 ">
                  <p className=" "> Area:</p>
                  <p> {match.area.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>




      </div>
    </div>
  );
}
