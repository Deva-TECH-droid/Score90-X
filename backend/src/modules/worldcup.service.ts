import axios from 'axios';

import {
  getWorldCupMatchesRepo,
  getWorldCupStandingsRepo,
  getWorldCupTeamsRepo,
  getMatchDetailsRepo,
  getWorldCupSingleTeamsRepo,
  getPersonRepo,
  getWorldCupTopScorersRepo,
} from './worldcup.repository';

import { mapMatch } from './worldcup.mapper';
import { getCachedData } from '../utils/cache';

export async function getWorldCupMatchesService() {
  return getCachedData(
    'wc-matches',
    async () => {
      const matches = await getWorldCupMatchesRepo();
      return matches.map(mapMatch);
    },
    1000 * 60 * 5, // 5 minutes
  );
}
export async function getTopScorersService() {
  return getCachedData(
    'wc-top-scorers',
    async () => {
      return await getWorldCupTopScorersRepo();
    },
    1000 * 60 * 5, // 5 minutes
  );
}

export async function getWorldCupStandingsService() {
  return getCachedData(
    'wc-standings',
    async () => {
      return await getWorldCupStandingsRepo();
    },
    1000 * 60 * 10, // 10 minutes
  );
}

export async function getWorldCupTeamsService() {
  return getCachedData(
    'wc-teams',
    async () => {
      return await getWorldCupTeamsRepo();
    },
    1000 * 60 * 60, // 1 hour
  );
}

export async function getWorldCupSingleTeamsService(id: string) {
  return getCachedData(
    `team-${id}`,
    async () => {
      return await getWorldCupSingleTeamsRepo(id);
    },
    1000 * 60 * 60, // 1 hour
  );
}

export async function getPersonService(id: string) {
  return getCachedData(
    `person-${id}`,
    async () => {
      return await getPersonRepo(id);
    },
    1000 * 60 * 60, // 1 hour
  );
}

export async function getMatchDetailsService(id: string) {
  return getCachedData(
    `match-${id}`,
    async () => {
      return await getMatchDetailsRepo(id);
    },
    1000 * 60 * 5, // 5 minutes
  );
}

export async function getPlayerImageService(playerName: string) {
  try {
    const response = await axios.get(
      'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php',
      {
        params: { p: playerName },
        timeout: 10000,
      },
    );

    const players = response.data?.player;

    if (!Array.isArray(players) || players.length === 0) {
      return null;
    }

    return players[0].strCutout || players[0].strThumb || players[0].strRender || null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      return null;
    }

    return null;
  }
}
