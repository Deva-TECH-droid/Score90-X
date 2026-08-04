import Image from 'next/image';
import type { Team } from '@/types';
import { Calendar, ChevronDown, User, Users } from 'lucide-react';
import ClubColors from './ClubColors';

type Player = Team['squad'][number];

export default function SingleTeam({ team }: { team?: Team | null }) {
  return (
    <div className="  flex flex-col gap-2 relative  border border-color rounded-xl bg-navy-blue ">
      <div className="relative   h-56 w-full overflow-hidden ">
        {/* Image Background with Fade Effect */}
        {team?.crest && (
          <>
            {/* Image Container - Left Side with Fade */}
            <div className="absolute  inset-0 right-0 w-1/2">
              <Image
                src={team.crest}
                alt={team.shortName}
                fill
                className="object-cover rounded-xl object-center"
                unoptimized
                priority
              />

              {/* Cloth Texture Overlay */}
              <div
                className="absolute inset-0 mix-blend-overlay opacity-40"
                style={{
                  backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 255, 255, 0.03) 2px,
                    rgba(255, 255, 255, 0.03) 4px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 255, 255, 0.02) 2px,
                    rgba(255, 255, 255, 0.02) 4px
                  )
                `,
                }}
              />

              {/* Left-to-Right Fade Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/40 to-[#081226]" />
            </div>
          </>
        )}

        {/* Content - Right Side */}
        <div className="absolute inset-0 left-1/2 flex flex-col space-y-2  px-8 py-6">
          <div className="space-x-2 flex     items-center">
            {team?.crest && (
              <img
                src={team.crest}
                alt={team.shortName}
                className="w-16 h-16 border rounded-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
            )}
            <h2 className="text-5xl  uppercase font-medium poppins-medium text-white ">
              {team?.name}
            </h2>
          </div>
          <hr className="border-slate-700/50" />
          <div className=" grid grid-cols-1 sm:grid-cols-2  text-sm  flex-wrap gap-2 ">
            <div className=" flex space-x-1  border border-slate-700/50 bg-slate-950/90 p-2 rounded-xl   items-center">
              <Calendar className="text-indigo-600" size={16} />
              <p className="text-slate-500">Founded:</p>
              <span className="   ">({team?.founded})</span>
            </div>

            <div className=" flex  bg-slate-950/90 space-x-1   border border-slate-700/50 p-2 rounded-xl items-center">
              <User className="text-indigo-600" size={16} />
              <p className="text-slate-500">Coach:</p>
              <span className="   ">{team?.coach?.name}</span>
            </div>

            <div className=" flex bg-slate-950/90 space-x-1   border border-slate-700/50 p-2 rounded-xl  items-center">
              <Users className="text-indigo-600" size={16} />
              <p className="text-slate-500">Squad Size:</p>
              <span className="   ">{team?.squad?.length || 0}</span>
            </div>

            <ClubColors clubColors={team?.clubColors || ''} />
          </div>
        </div>
      </div>
    </div>
  );
}
