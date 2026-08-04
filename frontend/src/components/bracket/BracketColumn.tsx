'use client';

import { BracketMatch } from '@/types/bracket';
import BracketMatchCard from './MatchCard';
import { PositionedMatch, MATCH_HEIGHT } from '@/utils/bracketLayout';
import Link from 'next/link';

interface Props {
  title: string;
  positioned: PositionedMatch<BracketMatch>[];
  height: number;
}

export default function BracketColumn({ title, positioned, height }: Props) {
  return (
    <div className="relative" style={{ width: 260, height: height + 40 }}>
      <h2 className="text-white font-bold mb-4 text-center absolute -top-10 left-0 right-0">
        {title}
      </h2>
      <div className="relative" style={{ height }}>
        {positioned.map(({ match, top }) => (
          <Link href={`/matches/${match.id}`} key={match.id} className="absolute left-0 w-full" style={{ top, height: MATCH_HEIGHT }}>
            <BracketMatchCard match={match} />
          </Link>
        ))}
      </div>
    </div>
  );
}