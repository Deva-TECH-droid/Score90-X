'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import MatchCountdown from '../ui/CountDown';

interface Props {
  data: any[] | null | undefined;
}

export default function LiveMatchesMiniOverView({ data }: Props) {
  const liveMatches =
    data?.filter((match) => match.status === 'IN_PLAY' || match.status === 'PAUSED') || [];

  const today = new Date().toLocaleDateString('en-CA');
  const [selectedDate, setSelectedDate] = useState(today);
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'finished'>('upcoming');

  // 🔹 Cascade: live -> upcoming -> finished, based on what's available for selectedDate
  useEffect(() => {
    if (!data || data.length === 0) return;

    const matchesOnDate = (status: string | string[]) =>
      data.filter((match) => {
        const matchDate = new Date(match.utcDate).toLocaleDateString('en-CA');
        const statuses = Array.isArray(status) ? status : [status];
        return matchDate === selectedDate && statuses.includes(match.status);
      });

    if (matchesOnDate(['IN_PLAY', 'PAUSED']).length > 0) {
      setActiveTab('live');
    } else if (matchesOnDate('TIMED').length > 0) {
      setActiveTab('upcoming');
    } else if (matchesOnDate('FINISHED').length > 0) {
      setActiveTab('finished');
    } else {
      setActiveTab('upcoming'); // default fallback, will show "No matches found"
    }
  }, [selectedDate, data]);

  // 🔹 Early guard: no data at all
  if (!data || data.length === 0) {
    return (
      <div className="bg-navy-blue p-2 rounded-xl border border-slate-800">
        <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-slate-700/30">
          <Calendar size={20} className="text-slate-500" />
          <p className="text-sm text-slate-400">No match data available</p>
        </div>
      </div>
    );
  }
// Counts per tab for the selected date (independent of activeTab)
const matchesForDate = data.filter(
  (match) => new Date(match.utcDate).toLocaleDateString('en-CA') === selectedDate
);

const liveCount = matchesForDate.filter(
  (m) => m.status === 'IN_PLAY' || m.status === 'PAUSED'
).length;
const upcomingCount = matchesForDate.filter((m) => m.status === 'TIMED').length;
const finishedCount = matchesForDate.filter((m) => m.status === 'FINISHED').length;

const TABS = [
  ...(liveMatches?.length > 0
    ? [{ id: 'live', label: 'Live', count: liveCount }]
    : []),
  { id: 'upcoming', label: 'Upcoming', count: upcomingCount },
  { id: 'finished', label: 'Finished', count: finishedCount },
];
  const filteredMatches =
    data?.filter((match) => {
      const matchDate = new Date(match.utcDate).toLocaleDateString('en-CA');

      const dateMatch = matchDate === selectedDate;

      let statusMatch = true;

      if (activeTab === 'live') {
        statusMatch = match.status === 'IN_PLAY' || match.status === 'PAUSED';
      }

      if (activeTab === 'upcoming') {
        statusMatch = match.status === 'TIMED';
      }

      if (activeTab === 'finished') {
        statusMatch = match.status === 'FINISHED';
      }

      return dateMatch && statusMatch;
    }) || [];

  const statusColors = {
    IN_PLAY: 'text-red-500',
    TIMED: 'text-blue-500',
    FINISHED: 'text-green-500',
  };

  return (
    <div className="bg-navy-blue p-2 rounded-xl border border-slate-800">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'live' | 'upcoming' | 'finished')}
                className={`px-4 py-2 rounded-lg font-medium !text-xs sm:!text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-950/70 text-gray-400 hover:bg-slate-900'
                }`}
              >
                 {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50">
            <Calendar size={16} className="text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-white !text-xs font-medium focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Matches */}
        <div className="mt-2 space-y-1 h-fit w-full overflow-auto">
          {filteredMatches.length === 0 ? (
            <div className="flex h-28 items-center justify-center rounded-xl border border-slate-700/30">
              <p className="text-sm text-slate-400">No matches found for {selectedDate}</p>
            </div>
          ) : (
            filteredMatches.map((match) => (
              <div key={match.id} className="group border border-slate-700/20 rounded-xl px-3 py-2">
                <Link href={`/matches/${match.id}`} className="flex items-center justify-between gap-4">
                  <div className="min-w-fit">
                    <div
                      className={`rounded-full text-xs sm:text-sm font-bold ${
                        statusColors[match.status as keyof typeof statusColors] || 'text-slate-500'
                      }`}
                    >
                      {match.status}
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(match.utcDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="h-8 w-8" />
                      <span className="text-white font-medium text-xs sm:text-sm">
                        {match.homeTeam.tla}
                      </span>
                    </div>

                    <div className="mx-6 text-center">
                      {match.status === 'TIMED' ? (
                        <MatchCountdown kickOff={match.utcDate} />
                      ) : (
                        <div className="text-center">
                          <div className="flex items-start justify-center gap-2">
                            <div className="flex items-start">
                              <span className="text-lg sm:text-xl font-bold text-white">
                                {match.score?.fullTime?.home ?? 0}
                              </span>
                              {match.score?.duration === 'PENALTY_SHOOTOUT' && (
                                <span className="-mt-1 ml-1 text-xs sm:text-sm font-bold text-sky-400">
                                  ({match.score?.penalties?.home})
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-slate-500">-</span>
                            <div className="flex items-start">
                              <span className="text-lg sm:text-xl font-bold text-white">
                                {match.score?.fullTime?.away ?? 0}
                              </span>
                              {match.score?.duration === 'PENALTY_SHOOTOUT' && (
                                <span className="-mt-1 ml-1 text-xs sm:text-sm font-bold text-sky-400">
                                  ({match.score?.penalties?.away})
                                </span>
                              )}
                            </div>
                          </div>
                          {match.score?.duration === 'PENALTY_SHOOTOUT' && (
                            <div className="mt-1 text-[10px] uppercase tracking-wider text-amber-400">
                              Penalties
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <span className="text-white font-medium text-xs sm:text-sm">
                        {match.awayTeam.tla}
                      </span>
                      <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="h-8 w-8" />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-2">
          <Link
            href={'/matches'}
            className="border p-2 rounded-lg border-slate-700/50 bg-slate-950/70 text-blue-700 hover:text-purple-300 font-medium text-xs sm:text-sm transition-colors flex items-center gap-2"
          >
            <Calendar size={15} className="text-white/50" />
            View Full Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}