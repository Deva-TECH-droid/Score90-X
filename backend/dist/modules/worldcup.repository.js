"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorldCupMatchesRepo = getWorldCupMatchesRepo;
exports.getWorldCupTopScorersRepo = getWorldCupTopScorersRepo;
exports.getWorldCupStandingsRepo = getWorldCupStandingsRepo;
exports.getWorldCupTeamsRepo = getWorldCupTeamsRepo;
exports.getWorldCupSingleTeamsRepo = getWorldCupSingleTeamsRepo;
exports.getPersonRepo = getPersonRepo;
exports.getMatchDetailsRepo = getMatchDetailsRepo;
const football_client_1 = require("../integrations/footbal-data/football.client");
async function getWorldCupMatchesRepo() {
    const response = await football_client_1.footballClient.get("/competitions/WC/matches");
    return response.data.matches;
}
async function getWorldCupTopScorersRepo() {
    const response = await football_client_1.footballClient.get("/competitions/WC/scorers");
    return response.data.scorers;
}
async function getWorldCupStandingsRepo() {
    const response = await football_client_1.footballClient.get("/competitions/WC/standings");
    return response.data.standings;
}
async function getWorldCupTeamsRepo() {
    const response = await football_client_1.footballClient.get("/competitions/WC/teams");
    return response.data.teams;
}
async function getWorldCupSingleTeamsRepo(id) {
    const response = await football_client_1.footballClient.get((`/teams/${id}`));
    return response.data;
}
async function getPersonRepo(id) {
    const response = await football_client_1.footballClient.get((`/persons/${id}`));
    return response.data;
}
async function getMatchDetailsRepo(id) {
    const response = await football_client_1.footballClient.get(`/matches/${id}`);
    return response.data;
}
