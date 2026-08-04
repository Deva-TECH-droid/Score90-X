import { worldcupApi } from './worldcup';
import type { Match } from '@/types';

export async function getMatches(): Promise<Match[]> {
  try {
    return await worldcupApi.getMatches();
  } catch (error) {
    console.error('Failed to fetch matches:', error);
    return [];
  }
}