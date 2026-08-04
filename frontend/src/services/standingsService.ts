import { worldcupApi } from './worldcup';
import type { StandingGroup } from '@/types';

export async function getStandings(): Promise<StandingGroup[]> {
  try {
    return await worldcupApi.getStandings();
  } catch (error) {
    console.error('Failed to fetch standings:', error);
    return [];
  }
}