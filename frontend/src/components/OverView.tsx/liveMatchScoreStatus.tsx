import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface StatItemProps {
  label: string;
  homeValue: number;
  awayValue: number;
}

const StatItem = ({ label, homeValue, awayValue }: StatItemProps) => {
  const total = homeValue + awayValue;
  const homePercent = (homeValue / total) * 100;

  return (
    <div className="space-y-1 text-center">
       <span className="text-gray-400 text-xs text-center">{label}</span>
      <div className="flex items-center justify-between text-xs text-gray-300">

        <span>{homeValue}</span>{' '}
        <div className="h-1.5 w-[80%] rounded-full bg-slate-700 overflow-hidden">
          <div className="flex h-full">
            <div
              className="bg-gradient-to-r from-purple-500 to-violet-400"
              style={{ width: `${homePercent}%` }}
            />
            <div
              className="bg-gradient-to-r from-amber-400 to-yellow-500"
              style={{ width: `${100 - homePercent}%` }}
            />
          </div>
        </div>
        <span>{awayValue}</span>
      </div>
    </div>
  );
};

export default function LiveMatchScoreStatus() {
  return (
    <>
      <div className="bg-slate-900/50 p-4 space-y-4 rounded-xl">
        <div className="flex mb-2 flex-row justify-between ">
          <h1 className="text-sm">Live Score</h1>
          <Link className="text-sm text-blue-700 flex flex-row gap-2" href="">
            View All
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-center justify-between">
          <p className="text-center text-xs text-gray-400">Group A • Matchday 2 of 3</p>
          <div className="flex w-[90%] items-center justify-between gap-2    ">
            <div className="flex flex-col gap-1 items-center">
              <img
                className=" border-2  w-10 h-10 rounded-full object-cover"
                src="https://crests.football-data.org/769.svg"
                alt=""
              />
              <p className="teamName1 text-sm ">Argentina</p>
            </div>
            <div className="text-center">
              <p className="text-xs bg-red-600 rounded-xl">LIVE</p>
              <p className="text-lg font-bold">2 - 4</p>
              <p className="text-xs text-gray-400">75:45</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <img
                className=" border-2  w-10 h-10 rounded-full object-cover"
                src="https://crests.football-data.org/798.svg"
                alt=""
              />
              <p className="teamName2 text-sm">Brazil</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border  border-slate-800/50 p-3  text-xs text-gray-400 mt-4 rounded-lg">
          <div className="space-y-1">
            <p>21' L.Messi </p>
            <p>63' J.Alvarez</p>
          </div>
          <div className="space-y-1">
            <p>45' Neymer.Jr </p>
            <p>29' Vini</p>
          </div>
        </div>
        <button className="bg-blue-800 p-2 flex w-full items-center justify-center rounded-lg gap-1 !text-xs text-white">
          Match Center <ArrowRight size={14} />
        </button>
      </div>
      <div className="bg-slate-900/50 p-4  rounded-xl">
        <h3 className="text-sm border-b border-slate-700/50 pb-1 mb-1">Match Stats</h3>

        <div className="px-4 flex items-center justify-between">
          <div className="text-center">
            <h4 className="text-xs   text-white/70">ARG</h4>
          </div>


          <div className="text-center">
            <h4 className="text-xs   text-white/70">BRA</h4>
          </div>
        </div>

        <div className="">
          <StatItem label="Possession" homeValue={52} awayValue={48} />

          <StatItem label="Shots on Target" homeValue={6} awayValue={5} />

          <StatItem label="Total Shots" homeValue={14} awayValue={11} />

          <StatItem label="Corners" homeValue={4} awayValue={3} />

          <StatItem label="Fouls" homeValue={8} awayValue={9} />
        </div>

        <button className="mt-2 flex w-full items-center justify-center gap-2 border-t border-slate-700/50 pt-3 !text-xs text-violet-400 transition hover:text-violet-300">
          View Full Stats
          <span>→</span>
        </button>
      </div>{' '}
    </>
  );
}
