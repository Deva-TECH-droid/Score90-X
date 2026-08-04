import { create } from 'zustand';
import type { Match, Team } from '@/types';

interface MatchesState {
  selectedMatch?: Match;
  setSelectedMatch: (match: Match | undefined) => void;
}
interface TeamState {
  selectedTeam?: Team;
  setSelectedTeam: (team: Team | undefined) => void;
}

export const useMatchesStore = create<MatchesState>((set) => ({
  selectedMatch: undefined,
  setSelectedMatch: (match) => set({ selectedMatch: match }),
}));

export const useTeamsStore = create<TeamState>((set) => ({
  selectedTeam: undefined,
  setSelectedTeam : (match) => set({ selectedTeam: match }),
}));
