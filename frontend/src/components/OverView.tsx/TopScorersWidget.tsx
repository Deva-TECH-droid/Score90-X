'use client';

import { getPlayerImage } from '@/services/playersImage';
import { TopScorer } from '@/types';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RowProps {
  scorer: TopScorer;
  rank: number;
}

function TopScorerRow({ scorer, rank }: RowProps) {
  const [image, setImage] = useState('null');

  useEffect(() => {
    if (!scorer?.player) return;

    getPlayerImage(scorer.player.name).then((img) => {
      if (img) setImage(img);
    });
  }, [scorer]);

  if (!scorer?.player) return null;

  return (
    <Link
      href={`/players/${scorer.player.id}`}
      className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-slate-800/40"
    >
      {/* Rank */}
      <span className="w-4 shrink-0 text-base font-semibold text-slate-500">
        {rank}
      </span>

      {/* Avatar */}
      <Image
        src={image}
        alt={scorer.player.name}
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-full object-cover bg-slate-800"
        unoptimized
      />

      {/* Name + Team */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">
          {scorer.player.name}
        </p>
        <div className="flex items-center gap-1.5">
          <Image
            src={scorer.team.crest}
            alt={scorer.team.name}
            width={14}
            height={14}
            className="h-4.5 w-4.5 object-contain"
            unoptimized
          />
          <span className="truncate text-sm font-medium text-slate-500">
            {scorer.team.tla}
          </span>
        </div>
      </div>

      {/* Goals */}
      <span className="shrink-0 text-sm font-bold text-[#C9A227]">
        {scorer.goals}
      </span>
    </Link>
  );
}

interface WidgetProps {
  scorers: TopScorer[];
  limit?: number;
}

export default function TopScorersWidget({ scorers, limit = 3 }: WidgetProps) {
  const top = scorers.slice(0, limit);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Top Scorers</h3>
        <Link
          href="/top-scorers"
          className="flex items-center gap-2 !text-sm text-blue-400 hover:text-blue-300"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-800/60">
        {top.map((scorer, i) => (
          <TopScorerRow key={scorer.player.id} scorer={scorer} rank={i + 1} />
        ))}
      </div>
    </div>
  );
}