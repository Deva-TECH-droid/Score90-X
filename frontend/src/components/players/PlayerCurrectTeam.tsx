'use client';

import { Person } from '@/types';
import Image from 'next/image';
import ClubColors from '../ui/ColorsBadges';
import ColorBadges from '../ui/ColorsBadges';
import { AppWindow, Calendar, LandPlotIcon, Locate, MapPin, Palette, Trophy } from 'lucide-react';
import { useState } from 'react';

interface PlayerProfileCardProps {
  player: Person;
}
export default function PlayerCurrectTeam({ player }: PlayerProfileCardProps) {
  const team = player.currentTeam;
  console.log(player.currentTeam);
  const [imgError, setImgError] = useState(false);

  const imageSrc =
    team.crest || 'https://i.pinimg.com/736x/f8/ac/88/f8ac888d041ec047923567995f7444fc.jpg';
  return (
    <div className="rounded-3xl border border-color bg-navy-blue  p-2  ">
      <h3 className=" text-lg p-2 font-medium mb-1 uppercase ">Current Team</h3>
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className=" flex items-start bg-slate-950/90  rounded-2xl py-3 px-2 h-full  gap-3">
            <div className="flex-1">
              <div className='flex items-center gap-5 sm:gap-10 p-2'>
                <Image
                  src={imageSrc}
                  alt={team.name || team.name}
                  width={150}
                  height={150}
                  className="w-20 h-20 sm:h-30 sm:w-30 object-contain "
                  unoptimized
                />
                {/* Header */}
                <div className="">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold text-white">{team.name}</h2>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                      {team.tla}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">Professional Football Club</p>
                </div>
              </div>

              {/* Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Founded */}
                <div className="rounded-2xl bg-slate-900/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Calendar size={16} />
                    <span className="text-xs uppercase tracking-wider">Founded</span>
                  </div>

                  <p className="text-lg font-semibold text-white">{team.founded}</p>
                </div>

                {/* Stadium */}
                {team.venue && (
                  <div className="rounded-2xl bg-slate-900/60 p-4">
                    <div className="mb-2 flex items-center gap-2 text-slate-400">
                      <LandPlotIcon size={16} />
                      <span className="text-xs uppercase tracking-wider">Stadium</span>
                    </div>

                    <p className="text-white">{team.venue}</p>
                  </div>
                )}

                {/* Address */}
                <div className="rounded-2xl bg-slate-900/60 p-4 sm:col-span-2">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <MapPin size={16} />
                    <span className="text-xs uppercase tracking-wider">Address</span>
                  </div>

                  <p className="text-white leading-relaxed">{team.address}</p>
                </div>

                {/* Website */}
                <div className="rounded-2xl bg-slate-900/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <AppWindow size={16} />
                    <span className="text-xs uppercase tracking-wider">Website</span>
                  </div>

                  <a
                    href={team.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition break-all"
                  >
                    {team.website}
                  </a>
                </div>

                {/* Club Colors */}
                <div className="rounded-2xl bg-slate-900/60 p-4">
                  <div className="mb-3 flex items-center gap-2 text-slate-400">
                    <Palette size={16} />
                    <span className="text-xs uppercase tracking-wider">Club Colors</span>
                  </div>

                  <ColorBadges
                    title={team.clubColors}
                    colors={team.clubColors}
                    titleClassName="text-sm text-slate-300"
                    className="gap-3"
                    colorsWrapperClassName="gap-3"
                    dotClassName="h-5 w-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2 ">
          <div className="  bg-slate-950/90   p-2 rounded-2xl">
            <h1 className="text-sm font-[400] mb-1 uppercase ">Area/Country</h1>
            <div className="border border-color flex items-center rounded-2xl p-2 gap-3">
              <img
                src={player.currentTeam.area.flag}
                alt={`${player.name} crest`}
                className="w-10 h-10  rounded-full    object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.display = 'none';
                }}
              />
              <hr className="border border-color h-10 w-0.5" />
              <span>
                <h1 className="text-lg">{player.currentTeam.area.name}</h1>
                <p className="text-sm text-slate-500">{player.currentTeam.area.code}</p>
              </span>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-950/90   ">
            <h1 className="text-sm font-[400] mb-1 uppercase ">Running Competitions</h1>
            <div className="space-y-1">
              {player.currentTeam.runningCompetitions?.map((competition) => (
                <div
                  key={competition.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-lg border border-color"
                >
                  <div className="flex">
                    {!competition.emblem || imgError ? (
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg  ">
                        <Trophy size={20} className="text-slate-400" />
                      </div>
                    ) : (
                      <img
                        src={competition.emblem}
                        alt={competition.name}
                        className="h-10 w-10 object-contain"
                        onError={() => setImgError(true)}
                      />
                    )}
                    <div>
                      <p className="text-sm font-light">{competition.name}</p>
                      <p className="text-xs text-gray-500">{competition.code}</p>
                    </div>
                  </div>
                  <p className="border border-color py-0.5 px-2 rounded-full text-slate-500 text-xs">
                    {competition.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
