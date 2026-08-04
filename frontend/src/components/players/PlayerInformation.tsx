import { Person } from '@/types';
import { User, CalendarDays, Flag, Shield, Shirt, Calendar } from 'lucide-react';
interface PlayerProfileCardProps {
  player: Person;
}
export default function PlayerInformation({ player }: PlayerProfileCardProps) {
  const details = [
    {
      icon: User,
      label: 'Full Name',
      value: player.name || '-',
    },
    {
      icon: User,
      label: 'First Name',
      value: player.firstName || '-',
    },
    {
      icon: User,
      label: 'Last Name',
      value: player.lastName || '-',
    },
    {
      icon: CalendarDays,
      label: 'Date of Birth',
      value: player.dateOfBirth
        ? new Date(player.dateOfBirth).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : '-',
    },
    {
      icon: Flag,
      label: 'Nationality',
      value: player.nationality || '-',
    },
    {
      icon: Shield,
      label: 'Section',
      value: player.section || '-',
    },
    {
      icon: Shirt,
      label: 'Position',
      value: player.position || '-',
    },
    {
      icon: Shirt,
      label: 'Shirt Number',
      value: player.shirtNumber || '-',
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-2 md:gap-3 lg:gap-4">
      <div className="bg-navy-blue w-full lg:w-[50%] border overflow-hidden border-color rounded-2xl">
        <h1 className="text-lg font-[400] px-3 md:px-5 py-3 border-b border-color uppercase">
          Player Details
        </h1>
        <div>
          {details.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`grid grid-cols-[24px_1fr_1fr] md:grid-cols-[28px_1fr_1fr] bg-slate-950/90 text-base md:text-base items-center gap-2 md:gap-4 px-2 md:px-3 py-2 md:py-3 ${
                  index !== details.length - 1 ? 'border-b border-slate-800/70' : ''
                }`}
              >
                <Icon size={16} className="md:size-[18px] text-slate-400 flex-shrink-0" />

                <span className="text-slate-300 truncate">{item.label}</span>

                <span className="font-medium text-white text-right md:text-left truncate">
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full lg:w-[50%]">
        <div className="bg-navy-blue p-2 md:p-3 rounded-2xl h-fit">
          <h1 className="text-lg font-[400] p-2 md:p-3 uppercase">Contract</h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-slate-950/90 p-2 md:p-3">
            {/* Icon */}
            <div className="flex h-12 w-12 md:h-15 md:w-15 items-center justify-center rounded-full bg-slate-800/40 flex-shrink-0">
              <CalendarDays size={20} className="md:size-[25px] text-slate-300" />
            </div>

            {/* Contract Dates */}
            <div className="flex flex-col sm:flex-row flex-1 w-full gap-4 sm:gap-0">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-wide text-slate-400">Start</p>
                <p className="text-base font-bold text-white break-words">
                  {player.currentTeam.contract?.start || '-'}
                </p>
              </div>

              <div className="hidden sm:block h-10 w-px bg-slate-800 mx-4" />
              <div className="block sm:hidden h-px w-full bg-slate-800" />

              <div className="flex-1">
                <p className="text-sm uppercase tracking-wide text-slate-400">Until</p>
                <p className="text-base font-bold text-white break-words">
                  {player.currentTeam.contract?.until || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
