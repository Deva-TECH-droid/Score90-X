export function mapMatch(match: any) {
  return {
     id: match.id,

  status: match.status,

  utcDate: match.utcDate,

  // ✅ ADD THESE
  stage: match.stage,

  group: match.group,

  matchday: match.matchday,

  lastUpdated: match.lastUpdated,

  homeTeam: {
    id: match.homeTeam.id,
    name: match.homeTeam.name,
    shortName: match.homeTeam.shortName,
    tla: match.homeTeam.tla,
    crest: match.homeTeam.crest,
  },

  awayTeam: {
    id: match.awayTeam.id,
    name: match.awayTeam.name,
    shortName: match.awayTeam.shortName,
    tla: match.awayTeam.tla,
    crest: match.awayTeam.crest,
  },

  score: match.score,
  };
}
