'use client';

import { ArrowRight } from 'lucide-react';
import { LiveMatchCard } from '@/components/matches/live-match-card';
import { MatchCard } from '@/components/matches/match-card';
 
import { SectionTitle } from '@/components/shared/section-title';
import { useLiveMatches } from '@/hooks/use-live-matches';
import { useMatches } from '@/hooks/use-matches';
import LiveNowBanner from '@/components/OverView.tsx/LiveNowBanner';
import OverView from '@/app/overView/page';

export default function HomePage() {
  const { data: liveData } = useLiveMatches();
  const { data: scheduleData } = useMatches();

  return (
    <div>
      {/* <LiveNowBanner /> */}
      <OverView />
    </div>
  );
}
