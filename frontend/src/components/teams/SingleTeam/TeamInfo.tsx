import type { Team } from '@/types';

export default function TeamInfo({ team }: { team: Team }) {
   const defenders = team?.squad?.filter((p) => p.position === 'Defence').length || 0;
  const midfielders = team?.squad?.filter((p) => p.position === 'Midfield').length || 0;
  const forwards = team?.squad?.filter((p) => p.position === 'Offence').length || 0;
  const goalkeepers = team?.squad?.filter((p) => p.position === 'Goalkeeper').length || 0;

  return (
    <>

      <div className="rounded-3xl bg-slate-900/80 border border-color p-3">
        <h3 className="text-sm  font-semibold text-white">Team information</h3>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          <li>
            <span className="font-medium text-slate-500">Country:</span> {team.area?.name || 'N/A'}
          </li>
   <hr className='h-0.5   border-color w-full'/>
          <li>
            <span className="font-medium text-slate-500">Coach:</span> {team.coach?.name || 'N/A'}
          </li>
     <hr className='h-0.5   border-color w-full'/>
          {team.founded && (
            <li>
              <span className="font-medium text-slate-500">Founded:</span> {team.founded}
            </li>
          )}
        <hr className='h-0.5   border-color w-full'/>
          {team.website && (
            <li>
              <span className="font-medium text-slate-500">Website:</span>{' '}
              <a
                href={team.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {team.website}
              </a>
            </li>
          )}
          <hr className='h-0.5   border-color w-full'/>
          {team.address && (
            <li>
              <span className="font-medium text-slate-500">Address:</span> {team.address}
            </li>
          )}

        </ul>
      </div>
        <aside className="rounded-3xl border border-color bg-slate-900/80 p-3">
          <p className="text-sm  font-semibold text-white ">Squad composition</p>
          <div className="mt-2 text-sm space-y-4">
            <div className="flex   justify-between items-center">
              <span className="text-slate-500">Goalkeepers</span>
              <span className="font-semibold text-slate-100">{goalkeepers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Defenders</span>
              <span className="font-semibold text-slate-100">{defenders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Midfielders</span>
              <span className="font-semibold text-slate-100">{midfielders}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Forwards</span>
              <span className="font-semibold text-slate-100">{forwards}</span>
            </div>
            <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
              <span className="text-slate-500">Total Squad</span>
              <span className="font-semibold text-slate-100">{team?.squad?.length || 0}</span>
            </div>
          </div>
        </aside>
    </>
  );
}
