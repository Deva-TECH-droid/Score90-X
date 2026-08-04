export interface MatchDetails {
  area: Area;
  competition: Competition;
  season: Season;

  id: number;
  utcDate: string;
  status: string;
  venue: string | null;
  matchday: number;
  stage: string;
  group: string | null;
  lastUpdated: string;

  homeTeam: Team;
  awayTeam: Team;

  score: Score;
  odds: Odds;
  referees: Referee[];
}
export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string | null;
}
export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}
export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: Team | null;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface ScoreResult {
  home: number | null;
  away: number | null;
}

export interface Score {
  winner: string | null;
  duration: string;

  halfTime: ScoreResult;
  regularTime?: ScoreResult;
  extraTime?: ScoreResult;
  penalties?: ScoreResult;
  fullTime: ScoreResult;
}

export interface Odds {
  msg: string;
}

export interface Referee {
  id?: number;
  name?: string;
  nationality?: string;
  type?: string;
}
