export interface StandingTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface StandingTableItem {
  position: number;
  team: StandingTeam;
  playedGames: number;
  form: string | null;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface StandingGroup {
  stage: string;
  type: string;
  group: string;
  table: StandingTableItem[];
}
