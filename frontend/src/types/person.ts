import type { Team } from './team';

export interface PersonCurrentTeam extends Omit<Team, 'squad' | 'coach'> {
  contract?: {
    start?: string;
    until?: string;
  };
}

export interface Person {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  section: string;
  position: string;
  shirtNumber: number;
  lastUpdated: string;
  currentTeam: PersonCurrentTeam;
}
