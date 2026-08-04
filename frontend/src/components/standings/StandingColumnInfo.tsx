'use client';

import React from 'react';

export default function StandingColumnInfo() {
  const columns = [
    {
      short: '#',
      full: 'Position',
    },
    {
      short: 'P',
      full: 'Played',
    },
    {
      short: 'W',
      full: 'Won',
    },
    {
      short: 'D',
      full: 'Drawn',
    },
    {
      short: 'L',
      full: 'Lost',
    },
    {
      short: 'GF',
      full: 'Goals For',
    },
    {
      short: 'GA',
      full: 'Goals Against',
    },
    {
      short: 'GD',
      full: 'Goal Difference',
    },
    {
      short: 'PTS',
      full: 'Points',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50   p-3">
      <h3 className="mb-1 text-lg font-medium   text-white">
        Table Guide
      </h3>

      <div className="grid grid-cols-2 gap-1">
        {columns.map((item) => (
          <div
            key={item.short}
            className="flex items-center justify-between rounded-lg bg-slate-800/50 px-2 py-2"
          >
            <span className="font-bold text-sm text-indigo-400">
              {item.short}
            </span>

            <span className="text-sm text-slate-300">
              {item.full}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}