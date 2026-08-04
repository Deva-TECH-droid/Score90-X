export interface Area {
  id: number;
  name: string;
  code: string;
  flag?: string;
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  dateOfBirth?: string;
  nationality?: string;
  contract?: {
    start?: string;
    until?: string;
  };
}

export interface Player {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem?: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  area: Area;
  address?: string;
  website?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  runningCompetitions?: Competition[];
  coach?: Coach;
  squad: Player[];
}
