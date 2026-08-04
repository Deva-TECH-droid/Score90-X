'use client';

import { useBracket } from '@/hooks/useBracket';
import BracketColumn from './BracketColumn';

import { organizeBracket } from '@/utils/groupBracket';
import { reorderByNextRound } from '@/utils/bracketPairing';
import { layoutRound, buildConnectors, bracketHeight, COLUMN_GAP, MATCH_HEIGHT } from '@/utils/bracketLayout';
import FinalCard from './FinalCard';

import BracketConnectors from './Connector';

export default function Bracket() {
  const { data = [], isLoading } = useBracket();
if (isLoading)
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-800 border-t-[#fff]" />
    </div>
  );

  const rounds = organizeBracket(data);

  // Reorder each round so array position lines up with real bracket adjacency,
  // walking backwards from the Final so every level uses an already-correct next round.
  const finalMatch = rounds.final[0];
  const semisOrdered = finalMatch
    ? reorderByNextRound(rounds.semiFinals, [finalMatch])
    : rounds.semiFinals;
  const quarterOrdered = reorderByNextRound(rounds.quarterFinals, semisOrdered);
  const round16Ordered = reorderByNextRound(rounds.roundOf16, quarterOrdered);
  const round32Ordered = reorderByNextRound(rounds.roundOf32, round16Ordered);

  const round32 = layoutRound(round32Ordered, 0);
  const round16 = layoutRound(round16Ordered, 1);
  const quarter = layoutRound(quarterOrdered, 2);
  const semi = layoutRound(semisOrdered, 3);

  const thirdPlaceMatch = rounds.thirdPlace[0];
  const totalHeight = bracketHeight(round32.length);

  const finalPositioned = finalMatch
    ? [{ match: finalMatch, top: totalHeight / 2 - MATCH_HEIGHT / 2, centerY: totalHeight / 2 }]
    : [];

  const c32to16 = buildConnectors(round32, round16);
  const c16toQF = buildConnectors(round16, quarter);
  const cQFtoSF = buildConnectors(quarter, semi);
  const cSFtoFinal = buildConnectors(semi, finalPositioned);

  const summary = [
    ['Round 32', round32.length],
    ['Round 16', round16.length],
    ['Quarters', quarter.length],
    ['Semis', semi.length],
    ['3rd Place', thirdPlaceMatch ? 1 : 0],
    ['Final', finalMatch ? 1 : 0],
  ] as const;

  return (
    <div className="  min-h-screen">


      <div className="overflow-x-auto">
        <div className="relative flex min-w-max items-start justify-center   py-16">
          {round32.length > 0 && (
            <>
              <BracketColumn title="Round of 32" positioned={round32} height={totalHeight} />
              <div className="relative" style={{ width: COLUMN_GAP, height: totalHeight }}>
                <BracketConnectors paths={c32to16} width={COLUMN_GAP} height={totalHeight} />
              </div>
            </>
          )}

          {round16.length > 0 && (
            <>
              <BracketColumn title="Round of 16" positioned={round16} height={totalHeight} />
              <div className="relative" style={{ width: COLUMN_GAP, height: totalHeight }}>
                <BracketConnectors paths={c16toQF} width={COLUMN_GAP} height={totalHeight} />
              </div>
            </>
          )}

          {quarter.length > 0 && (
            <>
              <BracketColumn title="Quarterfinal" positioned={quarter} height={totalHeight} />
              <div className="relative" style={{ width: COLUMN_GAP, height: totalHeight }}>
                <BracketConnectors paths={cQFtoSF} width={COLUMN_GAP} height={totalHeight} />
              </div>
            </>
          )}

          {semi.length > 0 && (
            <>
              <BracketColumn title="Semifinal" positioned={semi} height={totalHeight} />
              <div className="relative" style={{ width: COLUMN_GAP, height: totalHeight }}>
                <BracketConnectors paths={cSFtoFinal} width={COLUMN_GAP} height={totalHeight} />
              </div>
            </>
          )}

          <div className="flex flex-col items-center justify-center gap-8 " style={{ height: totalHeight }}>

            {finalMatch && <FinalCard match={finalMatch} />}
            {/* {thirdPlaceMatch && (
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-white font-bold text-sm">3rd Place Match</h3>
                <div className="w-64 rounded-lg border border-slate-800 bg-slate-900 p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-semibold">{thirdPlaceMatch.homeTeam?.name ?? 'TBD'}</span>
                    <span className="font-bold text-white">{thirdPlaceMatch.score.fullTime.home ?? '-'}</span>
                  </div>
                  <div className="h-px bg-slate-700" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-semibold">{thirdPlaceMatch.awayTeam?.name ?? 'TBD'}</span>
                    <span className="font-bold text-white">{thirdPlaceMatch.score.fullTime.away ?? '-'}</span>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}