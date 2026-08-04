export interface TeamSummary {
  id: string;
  name: string;
  crest: string;
  tla: string;
}

export interface ScoreSummary {
  winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
  duration: string;

  fullTime: {
    home: number | null;
    away: number | null;
  };

  halfTime: {
    home: number | null;
    away: number | null;
  };
}

export interface Match {
  id: string;

  status: string;

  utcDate: string;

  stage: string;

  group: string | null;

  matchday: number | null;

  lastUpdated: string;

  homeTeam: TeamSummary;

  awayTeam: TeamSummary;

  score: ScoreSummary;
}
