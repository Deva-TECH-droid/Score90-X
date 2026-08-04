'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import MatchCountdown from '../ui/CountDown';

interface Props {
  data: any[];
}

export default function LiveNowBanner({ data }: Props) {
  const [current, setCurrent] = useState(0);

  const todayString = new Date().toLocaleDateString('en-CA');

  const matches =
    data?.filter((match) => {
      const matchDay = new Date(match.utcDate).toLocaleDateString('en-CA');

      return matchDay === todayString;
    }) || [];

  useEffect(() => {
    if (matches.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === matches.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [matches.length]);

  if (!matches.length) {
    return (
      <div className="h-[40vh] rounded-xl bg-navy-blue flex items-center justify-center">
        <p className="text-slate-400">No matches available today</p>
      </div>
    );
  }

  const match = matches[current];
  console.log(match);

  return (
    <div className="liveNowBanner relative min-h-[250px] sm:min-h-[280px] md:h-[40vh] overflow-hidden rounded-xl   ">

      <div className='backdrop-blur-[4px] p-2 sm:p-4 h-full w-full'>



      <div className=" flex flex-col items-center justify-center">
        <h1 className=" text-lg font-bold uppercase">Today's Matches</h1>

        <p className="text-sm sm:text-base md:text-lg font-bold uppercase">
          {new Date(match.utcDate).toLocaleDateString([], {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* Previous */}
      <button
        onClick={() => setCurrent(current === 0 ? matches.length - 1 : current - 1)}
        className="absolute h-fit left-4 bottom-0 md:top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        onClick={() => setCurrent(current === matches.length - 1 ? 0 : current + 1)}
        className="absolute right-4 bottom-0 md:top-1/2 h-fit z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur"
      >
        <ChevronRight size={22} />
      </button>

      {/* Live Badge */}
      <div className="flex justify-center ">
        <span
          className={`
      px-3 py-1 rounded-full
      text-xs sm:text-sm mb-3 font-bold uppercase font-semibold uppercase

      ${
        match.status === 'IN_PLAY'
          ? 'bg-red-600  text-emerald-400 rounded-lg text-xs border  border-emerald-500/20 animate-pulse'
          : match.status === 'FINISHED'
            ? 'bg-emerald-500/15 text-emerald-400 rounded-lg text-xs border  border-emerald-500/20'
            : 'bg-blue-500/15 text-blue-400 border rounded-lg text-xs border-blue-500/20'
      }
    `}
        >
          {match.status}
        </span>
      </div>
      <div className="flex h-fit items-center justify-between sm:justify-center sm:gap-10">
        {/* Home Team */}
        <div className=" flex flex-col items-center text-center">
          <Image
            src={match.homeTeam.crest}
            alt={match.homeTeam.name}
            width={120}
            height={120}
            unoptimized
            className="w-[100px] h-[70px] md:w-[200px] md:h-[120px] object-cover"
          />

          <h2 className="  text-sm sm:text-base md:text-xl mt-1 font-bold   uppercase">{match.homeTeam.tla}</h2>
        </div>

        <div className="text-center">
          {match.status === 'TIMED' ? (
            <>
              <p className="text-3xl font-semibold text-white">
                {new Date(match.utcDate).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>

              <p className="  text-xs text-slate-400">Kick Off</p>

            </>
          ) : (
            <>
              <div className="text-3xl md:text-5xl font-semibold text-white">
                {match.score?.fullTime?.home}
                <span className="mx-6 text-blue-500">-</span>
                {match.score?.fullTime?.away}
              </div>

              <p className="text-base   text-white">
                {new Date(match.utcDate).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center text-center">
          <Image
            src={match.awayTeam.crest}
            alt={match.awayTeam.name}
            width={120}
            height={120}
            unoptimized
            className="w-[100px] h-[70px] md:w-[200px] md:h-[120px]   object-cover"
          />

          <h2 className=" text-sm sm:text-base md:text-xl mt-1  font-bold uppercase">{match.awayTeam.tla}</h2>
        </div>
      </div>
    {match.status === 'TIMED' && (
      <div className='flex justify-center items-center'>

  <MatchCountdown kickOff={match.utcDate} />
      </div>
)}
      <Link
        className="text-center top-3 right-3 absolute bg-blue-500/15 text-blue-400 border   border-blue-500/20  py-1 px-2 rounded-xl  font-medium  flex text-xs"
        href={`/matches/${match.id}`}
      >
        {' '}
       <span className='hidden sm:block'>
         Match Details
        </span>
         <ArrowRight size={14} className="inline-block items-center" />
      </Link>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {matches.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              current === index ? 'w-8 bg-white' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
       </div>
    </div>
  );
}
