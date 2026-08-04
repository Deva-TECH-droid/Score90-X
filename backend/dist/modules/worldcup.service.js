"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorldCupMatchesService = getWorldCupMatchesService;
exports.getTopScorersService = getTopScorersService;
exports.getWorldCupStandingsService = getWorldCupStandingsService;
exports.getWorldCupTeamsService = getWorldCupTeamsService;
exports.getWorldCupSingleTeamsService = getWorldCupSingleTeamsService;
exports.getPersonService = getPersonService;
exports.getMatchDetailsService = getMatchDetailsService;
exports.getPlayerImageService = getPlayerImageService;
const axios_1 = __importDefault(require("axios"));
const worldcup_repository_1 = require("./worldcup.repository");
const worldcup_mapper_1 = require("./worldcup.mapper");
const cache_1 = require("../utils/cache");
async function getWorldCupMatchesService() {
    return (0, cache_1.getCachedData)('wc-matches', async () => {
        const matches = await (0, worldcup_repository_1.getWorldCupMatchesRepo)();
        return matches.map(worldcup_mapper_1.mapMatch);
    }, 1000 * 60 * 5);
}
async function getTopScorersService() {
    return (0, cache_1.getCachedData)('wc-top-scorers', async () => {
        return await (0, worldcup_repository_1.getWorldCupTopScorersRepo)();
    }, 1000 * 60 * 5);
}
async function getWorldCupStandingsService() {
    return (0, cache_1.getCachedData)('wc-standings', async () => {
        return await (0, worldcup_repository_1.getWorldCupStandingsRepo)();
    }, 1000 * 60 * 10);
}
async function getWorldCupTeamsService() {
    return (0, cache_1.getCachedData)('wc-teams', async () => {
        return await (0, worldcup_repository_1.getWorldCupTeamsRepo)();
    }, 1000 * 60 * 60);
}
async function getWorldCupSingleTeamsService(id) {
    return (0, cache_1.getCachedData)(`team-${id}`, async () => {
        return await (0, worldcup_repository_1.getWorldCupSingleTeamsRepo)(id);
    }, 1000 * 60 * 60);
}
async function getPersonService(id) {
    return (0, cache_1.getCachedData)(`person-${id}`, async () => {
        return await (0, worldcup_repository_1.getPersonRepo)(id);
    }, 1000 * 60 * 60);
}
async function getMatchDetailsService(id) {
    return (0, cache_1.getCachedData)(`match-${id}`, async () => {
        return await (0, worldcup_repository_1.getMatchDetailsRepo)(id);
    }, 1000 * 60 * 5);
}
async function getPlayerImageService(playerName) {
    try {
        const response = await axios_1.default.get('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php', {
            params: { p: playerName },
            timeout: 10000,
        });
        const players = response.data?.player;
        if (!Array.isArray(players) || players.length === 0) {
            return null;
        }
        return players[0].strCutout || players[0].strThumb || players[0].strRender || null;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && error.response?.status === 429) {
            return null;
        }
        return null;
    }
}
