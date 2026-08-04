import { axiosClient } from '@/lib/axios';
import { getCache, getOrSetInFlightRequest, setCache } from '@/lib/cache';
import type { Match, Person, StandingGroup, Team, TopScorer } from '@/types';
import { BracketMatch } from '@/types/bracket';
import { MatchDetails } from '@/types/matchDetails';

export const worldcupApi = {
  getMatches: async (): Promise<Match[]> => {
    const cacheKey = 'matches';

    const cached = getCache(cacheKey);

    if (cached) return cached;

    return getOrSetInFlightRequest(cacheKey, async () => {
      const response = await axiosClient.get<{
        success: boolean;
        data: Match[];
      }>('/matches');

      setCache(cacheKey, response.data.data);

      return response.data.data;
    });
  },

  // getLiveMatches: async (): Promise<Match[]> => {
  //   const response = await axiosClient.get<{ success: boolean; data: Match[] }>('/matches/live');
  //   return response.data.data;
  // },
  getMatchById: async (matchId: string) => {
    const cacheKey = `match-${matchId}`;

    const cached = getCache(cacheKey);

    if (cached) return cached;
    const response = await axiosClient.get<{
      success: boolean;
      data: MatchDetails;
    }>(`/matchesDetails/${matchId}`);

    setCache(cacheKey, response.data.data);

    return response.data.data;
  },

  getTeams: async (): Promise<Team[]> => {
    const cacheKey = 'teams';

    const cached = getCache(cacheKey);

    if (cached) return cached;
    const response = await axiosClient.get<{
      success: boolean;
      data: Team[];
    }>('/teams');
    setCache(cacheKey, response.data.data);

    return response.data.data;
  },

  getTeamById: async (teamId: string) => {
    const cacheKey = `team-${teamId}`;

    const cached = getCache(cacheKey);

    if (cached) return cached;

    return getOrSetInFlightRequest(cacheKey, async () => {
      const response = await axiosClient.get<{
        success: boolean;
        data: Team;
      }>(`/teams/${teamId}`);

      setCache(cacheKey, response.data.data);

      return response.data.data;
    });
  },
  getPersonById: async (personId: string): Promise<Person> => {
    const cacheKey = `person-${personId}`;

    const cached = getCache(cacheKey);
    if (cached) return cached;

    return getOrSetInFlightRequest(cacheKey, async () => {
      const response = await axiosClient.get<{
        success: boolean;
        data: Person;
      }>(`/persons/${personId}`);

      setCache(cacheKey, response.data.data);

      return response.data.data;
    });
  },
  getStandings: async (): Promise<StandingGroup[]> => {
    const cacheKey = 'standings';

    const cached = getCache(cacheKey);
    if (cached) return cached;
    const response = await axiosClient.get<{
      success: boolean;
      data: StandingGroup[];
    }>('/standings');

    setCache(cacheKey, response.data.data);

    return response.data.data;
  },
  getTopScorers: async (): Promise<TopScorer[]> => {
    const cacheKey = 'top-scorers';

    const cached = getCache(cacheKey);
    if (cached) return cached;
    const response = await axiosClient.get<{
      success: boolean;
      data: TopScorer[];
    }>('/scorers');

    setCache(cacheKey, response.data.data);

    return response.data.data;
  },
};
