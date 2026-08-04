import { worldcupApi } from './worldcup';
import type { MatchDetails } from '@/types/matchDetails';

export async function getMatchDetails(id: string): Promise<MatchDetails | null> {
  try {
    return await worldcupApi.getMatchById(id);
  } catch (error) {
    console.error(`Failed to fetch match ${id}:`, error);
    return null;
  }
}