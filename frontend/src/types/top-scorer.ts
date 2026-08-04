export interface TopScorer {
  player: {
    id: number;
    name: string;
    nationality: string;
  };

  team: {
    id: number;
    name: string;
    crest: string;
    tla: string;
  };

  goals: number;
  assists: number | null;
  penalties: number | null;
  playedMatches: number;
}