import { worldcupApi } from './worldcup';
import type { Person } from '@/types';

export async function getPerson(id: string): Promise<Person | null> {
  try {
    return await worldcupApi.getPersonById(id);
  } catch (error) {
    console.error(`Failed to fetch player ${id}:`, error);
    return null;
  }
}