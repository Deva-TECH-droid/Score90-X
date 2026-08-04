import Image from 'next/image';
import { ArrowUpRight, Home, Plane } from 'lucide-react';
import Link from 'next/link';

interface MatchDetailsProps {
  match: any;
}

function TeamCard({
  team,
  title,
  icon,
}: {
  team: any;
  title: string;
  icon: React.ReactNode;

}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-navy-blue    p-2">
      {/* Header */}
      <div className='flex  items-center justify-between'>

      <div className="mb-1 gap-1 flex items-center ">
        <div className='flex p-2 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition'>{icon}</div>

        <h3 className="  flex items-center gap-2 text-lg font-medium text-white">{title}</h3>
      </div>
      <Link className='text-sm flex items-center gap-1 text-indigo-700 underline' href={`/teams/${team.id}`}>View Team <ArrowUpRight size={18} /></Link>
      </div>

      <div className="flex  gap-2 flex-row">
        {/* Logo */}
        <div className="flex p-2 ">
          <Image
            src={team.crest}
            alt={team.name}
            width={110}
            height={110}
            unoptimized
            className="  object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white">{team.name}</h4>


          <div className="space-y-1 text-sm">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Full Name</span>
              <span className=" text-white">{team.shortName}</span>
            </div>

            <div className="flex justify-between  pb-2">
              <span className="text-slate-400">Short Name</span>
              <span className=" text-white">{team.tla}</span>
            </div>


          </div>
        </div>
      </div>


    </div>
  );
}

export default function HomeAwayTeamDetails({ match }: MatchDetailsProps) {
  return (
    <div className="grid gap-2 lg:grid-cols-2">
      <TeamCard team={match.homeTeam} title="Home Team" icon={<Home size={18} />} />

      <TeamCard team={match.awayTeam} title="Away Team" icon={<Plane size={18} />} />
    </div>
  );
}
