'use client';

import Image from 'next/image';
import { Calendar, ChevronRight, Globe, Shield } from 'lucide-react';
import { getPlayerImage } from '@/services/playersImage';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CoachCard({ coach }: { coach: any }) {
  const [image, setImage] = useState('/coach-placeholder.png');

  useEffect(() => {
    if (!coach?.name) return;

    getPlayerImage(coach.name).then((img) => {
      if (img) setImage(img);
    });
  }, [coach?.name]);

  if (!coach) return null;
  console.log(coach);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#081226] p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-white">Head Coach</h2>

        <Link
          href={`/players/${coach.id}`}
          className="flex items-center rounded-full bg-indigo-600/20 px-2 py-1 text-xs text-indigo-400"
        >
          Profile
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Image
          src={image}
          alt={coach.name}
          width={130}
          height={130}
          className="h-[110px] w-[110px] rounded-2xl border border-slate-700 object-cover sm:h-[130px] sm:w-[130px]"
          unoptimized
        />

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">{coach.name}</h3>

          <p className="mt-1 text-indigo-400">{coach.nationality}</p>

          <div className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-900 p-3">
              <Globe className="mb-2 text-indigo-400" size={18} />
              <p className="text-sm text-slate-400">Nationality</p>
              <h4 className="font-semibold text-white">{coach.nationality}</h4>
            </div>

            <div className="rounded-xl bg-slate-900 p-3">
              <Calendar className="mb-2 text-green-400" size={18} />
              <p className="text-sm text-slate-400">Born</p>
              <h4 className="font-semibold text-white">{coach.dateOfBirth ?? 'Unknown'}</h4>
            </div>

            <div className="rounded-xl bg-slate-900 p-3">
              <Shield className="mb-2 text-yellow-400" size={18} />
              <p className="text-sm text-slate-400">Role</p>
              <h4 className="font-semibold text-white">Head Coach</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
