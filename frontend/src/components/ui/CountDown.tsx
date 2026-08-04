'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  kickOff: string;
}

export default function MatchCountdown({ kickOff }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = new Date(kickOff).getTime() - Date.now();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [kickOff]);

  if (!timeLeft) {
    return <div className="rounded-2xl bg-green-500/10 text-center text-green-400"></div>;
  }

  return (
    <div className=" flex items-center rounded-xl border border-slate-700/50 bg-slate-900/60 px-1 py-2 backdrop-blur-md justify-center gap-2 sm:gap-3">
      <TimeBox value={timeLeft.days} label="D" />
      <Dot />
      <TimeBox value={timeLeft.hours} label="H" />
      <Dot />
      <TimeBox value={timeLeft.minutes} label="M" />
      <Dot />
      <TimeBox value={timeLeft.seconds} label="S" />
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex  sm:min-w-[52px] flex-col items-center ">
      <span className="text-sm sm:text-lg font-medium leading-none text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </span>

      <span className="mt-0.5 text-[10px] sm:text-xs uppercase tracking-wider text-slate-400">
        {label}
      </span>
    </div>
  );
}

function Dot() {
  return <div className="h-1 w-1 rounded-full bg-white/50" />;
}
