import { footballClient } from "../integrations/footbal-data/football.client";



export async function getWorldCupMatchesRepo() {
  const response = await footballClient.get(
    "/competitions/WC/matches"
  );

  return response.data.matches;
}
export async function getWorldCupTopScorersRepo() {
  const response = await footballClient.get(
    "/competitions/WC/scorers"
  );

  return response.data.scorers;
}


export async function getWorldCupStandingsRepo() {
  const response = await footballClient.get(
    "/competitions/WC/standings"
  );

  return response.data.standings;
}

export async function getWorldCupTeamsRepo() {
  const response = await footballClient.get(
    "/competitions/WC/teams"
  );

  return response.data.teams;
}
export async function getWorldCupSingleTeamsRepo(id: string) {
  const response = await footballClient.get(
    (`/teams/${id}`)
  );


  return response.data;
}
export async function getPersonRepo(id: string) {
  const response = await footballClient.get(
    (`/persons/${id}`)
  );


  return response.data;
}
export async function getMatchDetailsRepo(id: string) {
  const response = await footballClient.get(`/matches/${id}`);

  return response.data;
}