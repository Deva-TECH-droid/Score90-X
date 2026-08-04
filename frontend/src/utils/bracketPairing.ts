import { BracketMatch } from '@/types/bracket';

function teamKey(
  team?: { id?: string | number; tla?: string; name?: string } | null,
): string | null {
  if (!team) return null;
  // Prefer id (most reliable), fall back to tla/name if id is missing
  return team.id != null
    ? `id:${team.id}`
    : team.tla
      ? `tla:${team.tla}`
      : team.name
        ? `name:${team.name}`
        : null;
}

function matchTeamKeys(match: BracketMatch): string[] {
  return [teamKey(match.homeTeam), teamKey(match.awayTeam)].filter(Boolean) as string[];
}

/**
 * Reorders `currentRound` so that currentRound[2*j] and currentRound[2*j+1]
 * are the two matches that actually feed into nextRound[j].
 * Falls back to original relative order for any match it can't confidently place
 * (e.g. teams not yet determined).
 */
export function reorderByNextRound(
  currentRound: BracketMatch[],
  nextRound: BracketMatch[],
): BracketMatch[] {
  const used = new Set<number>();
  const slots: (BracketMatch | null)[] = new Array(nextRound.length * 2).fill(null);

  nextRound.forEach((nextMatch, j) => {
    const wantedKeys = matchTeamKeys(nextMatch); // up to 2 keys: home & away
    wantedKeys.forEach((key) => {
      const idx = currentRound.findIndex((m, i) => !used.has(i) && matchTeamKeys(m).includes(key));
      if (idx !== -1) {
        used.add(idx);
        // put it in the first free slot of this pair (0 or 1)
        const slot0 = j * 2;
        slots[slots[slot0] === null ? slot0 : slot0 + 1] = currentRound[idx];
      }
    });
  });

  // Fill any unresolved slots with leftover matches, preserving their relative order
  const leftovers = currentRound.filter((_, i) => !used.has(i));
  let li = 0;
  for (let i = 0; i < slots.length; i++) {
    if (slots[i] === null) slots[i] = leftovers[li++] ?? null;
  }

  return slots.filter((m): m is BracketMatch => m !== null);
}
