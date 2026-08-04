'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { Team } from '@/types';
import Link from 'next/link';
import { ChevronRight, User2Icon } from 'lucide-react';
import { getPlayerImage } from '@/services/playersImage';

export default function TeamPlayers({ team }: { team: Team }) {
  const groupedPlayers = useMemo(() => {
    return {
      goalkeepers: team?.squad?.filter((p) => p.position?.toLowerCase() === 'goalkeeper'),
      defenders: team?.squad?.filter(
        (p) => p.position?.toLowerCase() === 'defence' || p.position?.toLowerCase() === 'defender',
      ),
      midfielders: team?.squad?.filter(
        (p) =>
          p.position?.toLowerCase() === 'midfield' || p.position?.toLowerCase() === 'midfielder',
      ),
      forwards: team?.squad?.filter(
        (p) =>
          p.position?.toLowerCase() === 'offence' ||
          p.position?.toLowerCase() === 'forward' ||
          p.position?.toLowerCase() === 'attacker',
      ),
    };
  }, [team]);

  const PlayerCard = ({ player }: any) => {
    const [image, setImage] = useState('null');

    useEffect(() => {
      async function loadImage() {
        const img = await getPlayerImage(player.name);

        if (img) {
          setImage(img);
        }
      }

      loadImage();
    }, [player.name]);

    return (
      <div className="group rounded-xl border border-color bg-slate-950/90 p-2.5 transition-all duration-300 hover:border-blue-500/40 hover:bg-[#0D1A33] sm:p-3">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-800 sm:h-16 sm:w-16">
            <Image src={image} alt={player.name} fill className="object-cover" unoptimized />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-semibold text-white">{player.name}</h4>

            <p className="text-xs text-slate-400">{player.dateOfBirth}</p>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 sm:text-xs">
              <span className="truncate">{player.nationality}</span>

              <Link href={`/players/${player.id}`} className="flex items-center text-indigo-500">
                Profile
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Section = ({ title, players, color }: { title: string; players: any[]; color: string }) => {
    if (!players?.length) return null;

    return (
      <div>
        <div className="mb-2 text-xs font-bold uppercase tracking-[2px]" style={{ color }}>
          {title}
        </div>

        <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-color bg-navy-blue p-3">
      {/* Header */}
      <div>
        <h1>Coach</h1>
        <div></div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg   text-white">Squad</h2>

          <p className="text-sm text-slate-400">{team?.squad?.length || 0} Players</p>
        </div>
      </div>
      <hr className="h-0.5   border-color w-full" />
      <div className="space-y-2  mt-2">
        {/* Goalkeepers */}
        <Section title="Goalkeepers" players={groupedPlayers.goalkeepers} color="#FACC15" />

        {/* Defenders */}
        <Section title="Defenders" players={groupedPlayers.defenders} color="#3B82F6" />

        {/* Midfielders */}
        <Section title="Midfielders" players={groupedPlayers.midfielders} color="#A855F7" />

        {/* Forwards */}
        <Section title="Forwards" players={groupedPlayers.forwards} color="#EF4444" />
      </div>
    </div>
  );
}
