import { BracketMatch, BracketRounds } from '@/types/bracket';

export function organizeBracket(matches: BracketMatch[]): BracketRounds {
  console.log('📊 Organizing Bracket with', matches.length, 'total matches');

  const sortByDate = (stage: string) => {
    const filtered = matches.filter((m) => m.stage === stage);
    console.log(`  ${stage}:`, filtered.length, 'matches -', filtered);
    return filtered.sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
  };

  const roundOf32 = sortByDate('LAST_32');
  const roundOf16 = sortByDate('LAST_16');
  const quarterFinals = sortByDate('QUARTER_FINALS');
  const semiFinals = sortByDate('SEMI_FINALS');
  const thirdPlace = sortByDate('THIRD_PLACE');
  const final = sortByDate('FINAL');

  // Sort by matchday to ensure proper bracket structure
  const sortByMatchday = (rounds: BracketMatch[], label: string) => {
    const sorted = rounds.sort((a, b) => {
      if (a.matchday === b.matchday) {
        return new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();
      }
      return (a.matchday || 0) - (b.matchday || 0);
    });
    console.log(`✓ ${label}: ${sorted.length} matches sorted by matchday`);
    return sorted;
  };

  return {
    roundOf32: sortByMatchday(roundOf32, 'Round of 32'),
    roundOf16: sortByMatchday(roundOf16, 'Round of 16'),
    quarterFinals: sortByMatchday(quarterFinals, 'Quarter Finals'),
    semiFinals: sortByMatchday(semiFinals, 'Semi Finals'),
    thirdPlace: sortByMatchday(thirdPlace, 'Third Place'),
    final: sortByMatchday(final, 'Final'),
  };
}
