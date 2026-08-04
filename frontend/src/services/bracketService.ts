import { BracketMatch } from '@/types/bracket';
import { worldcupApi } from './worldcup';


export async function getbracketMatches(): Promise<BracketMatch[]> {
  try {
    return await worldcupApi.getMatches();
  } catch (error) {
    console.error('Failed to fetch matches:', error);
    return [];
  }
}