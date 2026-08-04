import { worldcupApi } from './worldcup';
import type { Team } from '@/types';

export async function getTeams(): Promise<Team[]> {
  try {
    return await worldcupApi.getTeams();
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    return [];
  }
}

export async function getTeamById(teamId: string): Promise<Team | null> {
  try {
    return await worldcupApi.getTeamById(teamId);
  } catch (error) {
    console.error(`Failed to fetch team ${teamId}:`, error);
    return null;
  }
}