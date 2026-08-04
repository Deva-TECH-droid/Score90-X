import TeamsPage from "@/components/teams/Team";
import { getTeams } from "@/services/teamService";



export default async function TeamsLayout() {
   const teams = await getTeams();
  return (
    <main className="min-h-screen bg-[#030712] text-white">


        <TeamsPage teams={teams}/>

    </main>
  );
}