'use client';

import { getPlayerImage } from '@/services/playersImage';
import { TopScorer } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trophy, Goal, Shirt, Flag } from 'lucide-react';

interface Props {
  scorer: TopScorer;
  rank: number;
}

export default function TopScorerCard({ scorer, rank }: Props) {
  const [image, setImage] = useState('null');

  useEffect(() => {
    if (!scorer?.player) return;

    getPlayerImage(scorer.player.name).then((img) => {
      if (img) setImage(img);
    });
  }, [scorer]);

  if (!scorer?.player) return null;
 const top3 =
    rank === 1
      ? 'bg-yellow-400'
      : rank === 2
      ? 'bg-gray-400/70'
      : rank === 3
      ? 'bg-amber-950'
      : ' bg-gray-700/50';
  return (
   <Link
  href={`/players/${scorer.player.id}`}
  className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#081226] transition-all duration-300 hover:border-blue-500/40"
>
  {/* Rank */}
  <div
    className={`absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${top3}`}
  >
    {rank}
  </div>

  {/* Team */}
  <div className="absolute right-4 top-4 flex items-center gap-2">
    <Image
      src={scorer.team.crest}
      alt={scorer.team.name}
      width={26}
      height={26}
      className="h-6 w-6 object-contain"
      unoptimized
    />

    <span className="text-sm text-slate-400">
      {scorer.team.tla}
    </span>
  </div>

  {/* Player */}
  <div className="flex justify-center pt-10 px-6">
    <Image
      src={image}
      alt={scorer.player.name}
      width={180}
      height={180}
      className="h-48 w-auto object-contain "
      unoptimized
    />
  </div>

  {/* Info */}
  <div className="border-t border-slate-800 sm:px-5 py-4">
    <h2 className="truncate text-center text-lg font-semibold text-white">
      {scorer.player.name}
    </h2>

    <p className="mt-1 text-center text-sm text-slate-500">
      {scorer.team.name}
    </p>

    <div className="mt-1 grid grid-cols-3 divide-x divide-slate-800">
      <div className="text-center">
        <p className="text-xl font-bold text-yellow-400">
          {scorer.goals}
        </p>
        <span className="text-xs text-slate-500">
          Goals
        </span>
      </div>

      <div className="text-center">
        <p className="text-xl font-bold text-white">
          {scorer.assists ?? 0}
        </p>
        <span className="text-xs text-slate-500">
          Assists
        </span>
      </div>

      <div className="text-center">
        <p className="text-xl font-bold text-white">
          {scorer.playedMatches}
        </p>
        <span className="text-xs text-slate-500">
          Matches
        </span>
      </div>
    </div>
  </div>
</Link>
  );
}
