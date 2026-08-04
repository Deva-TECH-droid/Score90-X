import { Match, TeamSummary } from './match';

export type BracketTeam = TeamSummary;

// Extends the base score shape with fields that only appear
// once a match has gone to extra time / penalties.
export interface BracketScore {
  duration: string;
  winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
  fullTime: {
    home: number | null;
    away: number | null;
  };
  halfTime: {
    home: number | null;
    away: number | null;
  };
  regularTime?: {
    home: number | null;
    away: number | null;
  };
  extraTime?: {
    home: number | null;
    away: number | null;
  };
  penalties?: {
    home: number | null;
    away: number | null;
  };
}

export interface BracketMatch extends Omit<Match, 'score'> {
  stage: string;
  matchday: number | null;
  score: BracketScore;
}

export interface BracketNode extends BracketMatch {
  leftSource?: number;
  rightSource?: number;
}

export interface BracketRounds {
  roundOf32: BracketNode[];
  roundOf16: BracketNode[];
  quarterFinals: BracketNode[];
  semiFinals: BracketNode[];
  thirdPlace: BracketNode[];
  final: BracketNode[];
}