export const MATCH_HEIGHT = 110;
export const BASE_GAP = 28;
export const COLUMN_GAP = 64;

export interface PositionedMatch<T> {
  match: T;
  top: number;
  centerY: number;
}

// roundIndex 0 = first round (Round of 32), 1 = Round of 16, etc.
// Each match is centered exactly between the two matches that feed it.
export function layoutRound<T>(matches: T[], roundIndex: number): PositionedMatch<T>[] {
  const slot = (MATCH_HEIGHT + BASE_GAP) * Math.pow(2, roundIndex);
  return matches.map((match, k) => {
    const top = k * slot + slot / 2 - MATCH_HEIGHT / 2;
    return { match, top, centerY: top + MATCH_HEIGHT / 2 };
  });
}

export function bracketHeight(firstRoundCount: number): number {
  return Math.max(firstRoundCount, 1) * (MATCH_HEIGHT + BASE_GAP);
}

export interface ConnectorPath {
  key: string;
  d: string;
}

export function buildConnectors<T>(
  currentRound: PositionedMatch<T>[],
  nextRound: PositionedMatch<unknown>[],
  gapWidth: number = COLUMN_GAP
): ConnectorPath[] {
  const paths: ConnectorPath[] = [];

  nextRound.forEach((target, j) => {
    const top = currentRound[j * 2];
    const bottom = currentRound[j * 2 + 1];
    if (!top || !bottom) return;

    const midX = gapWidth / 2;
    const d = `M0,${top.centerY} H${midX} V${bottom.centerY} H0 M${midX},${target.centerY} H${gapWidth}`;

    paths.push({ key: `pair-${j}`, d });
  });

  return paths;
}